const Service = require('egg').Service;

class HiringService extends Service {
    async createHiring(data) {
        return this.ctx.model.Hiring(data).save();
    }

    async findHiring(condition) {
        const { page = 1, pageSize = 10 } = condition;
        delete condition.page;
        delete condition.pageSize;
        return this.ctx.model.Hiring.find(condition)
            .limit(pageSize)
            .skip((page - 1) * pageSize).sort('-createDate');
    }

    async searchHiring(condition) {
        const { page = 1, pageSize = 10, keyword } = condition;
        const reg = new RegExp(keyword, 'i');
        delete condition.page;
        delete condition.pageSize;
        delete condition.keyword;
        const count = await this.ctx.model.Hiring.find(condition)
            .or([{ job: { $regex: reg } }, { name: { $regex: reg } }, { tel: { $regex: reg } }])
            .count();
        const result = await this.ctx.model.Hiring.find(condition)
            .or([{ job: { $regex: reg } }, { name: { $regex: reg } }, { tel: { $regex: reg } }])
            .limit(pageSize)
            .skip((page - 1) * pageSize).sort('-createDate')
            .lean();
        return {
            count,
            result
        }
    }

    async updateHiring(condition, data) {
        const updateData = {
            status: data.status,
            reasonClassification: data.reasonClassification,
            reasons: data.reasons
        }
        return this.ctx.model.Hiring.findOneAndUpdate(condition, { ...updateData })
    }
}

module.exports = HiringService;