const Service = require('egg').Service;

class HiringService extends Service {
    async createHiring(data) {
        return this.ctx.model.Hiring(data).save();
    }

    async findHiring(condition) {
        const { page = 1, pageSize = 10, keyword = '' } = condition;
        delete condition.page;
        delete condition.pageSize;
        delete condition.keyword;
        return this.ctx.model.Hiring.find(condition)
            .limit(pageSize)
            .skip((page - 1) * pageSize).sort('-createDate');
    }
}

module.exports = HiringService;