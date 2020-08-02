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
        const reg = new RegExp(keyword, 'i')
        return this.ctx.model.Hiring.find({
            // name: { $regex: reg }
        })
            .or([{ job: { $regex: reg } }, { name: { $regex: reg } }])
            .limit(pageSize)
            .skip((page - 1) * pageSize).sort('-createDate');
    }
}

module.exports = HiringService;