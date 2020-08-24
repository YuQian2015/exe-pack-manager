const Service = require('egg').Service;

class HiringService extends Service {
    async createHiring(data) {
        return this.ctx.model.Hiring(data).save();
    }

    async findHiring(condition) {
        const { page = 1, pageSize = 10 } = condition;
        delete condition.page;
        delete condition.pageSize;
        const count = await this.ctx.model.Hiring.find(condition).count();
        const result = this.ctx.model.Hiring.find(condition).limit(pageSize).skip((page - 1) * pageSize);
        return {
            count,
            result
        }
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
            .skip((page - 1) * pageSize)
            .lean();
        return {
            count,
            result
        }
    }

    async updateHiring(condition, data) {
        return this.ctx.model.Hiring.findOneAndUpdate(condition, { ...data })
    }

    async report(condition) {
        const { startDate, endDate } = condition;
        const Hiring = this.ctx.model.Hiring;
        const filter = { "sendDate": { $gte: new Date(startDate), $lt: new Date(endDate) } };
        // $gte (greater-than)
        // $lt (less-than)
        // const allDocs = await Hiring.find(filter);
        const totalCount = await Hiring.find(filter).count();
        const status = await Hiring.aggregate()
            .match(filter)
            .group({
                _id: '$status',
                count: { $sum: 1 }
            });
            console.log(status);
        const channel = await Hiring.aggregate()
            .match(filter)
            // 针对渠道字段做统计，渠道字段唯一，如果不唯一则数量加一 并且统计总支出
            .group({
                _id: '$channel',
                count: { $sum: 1 },
                cost: { $sum: "$channelCost" },
                maxCost: { $max: "$channelCost" }
            })
        // .lookup({ from: 'hiring', localField: '_id', foreignField: '_id', as: 'hiring' });
        // .project({
        //     "doc": {
        //         "_id": "$_id",
        //         "total": "$channelCost"
        //     }

        // });
        const area = await Hiring.aggregate()
        .match(filter)
        // 针对渠道字段做统计，渠道字段唯一，如果不唯一则数量加一 并且统计总支出
        .group({
            _id: '$area',
            count: { $sum: 1 }
        })
        // console.log(area);
        // console.log(channel);
        return { totalCount, channel, status, area }
    }
}

module.exports = HiringService;