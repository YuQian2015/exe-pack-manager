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

    async report(condition) {
        const { startDate, endDate } = condition;
        const Hiring = this.ctx.model.Hiring;
        // $gte (greater-than)
        // $lt (less-than)
        const totalCount = await Hiring.find({ 'sendDate': { $gte: startDate, $lt: endDate } }).count();
        const interviewCount = await Hiring.find({ 'sendDate': { $gte: startDate, $lt: endDate } }).where('status').gte(4).count();
        const offerCount = await Hiring.find({ 'sendDate': { $gte: startDate, $lt: endDate } }).where('status').gte(7).count();
        const refuseCount = await Hiring.find({ 'sendDate': { $gte: startDate, $lt: endDate } }).where({'status': 7}).count();
        const leaveCount = await Hiring.find({ 'sendDate': { $gte: startDate, $lt: endDate } }).where({'status': 9}).count();
        // const offer = await Hiring.find({ 'sendDate': { $gte: startDate, $lt: endDate } }, 'status').where('status').gte(7);
        return { totalCount, interviewCount, offerCount, refuseCount, leaveCount }
    }
}

module.exports = HiringService;