const Service = require('egg').Service;


class CdnService extends Service {
    findCdn() {
        return this.ctx.model.Cdn.find()
    }
    createCdn(data) {
        return this.ctx.model.Cdn({ ...data }).save()
    }

}

module.exports = CdnService;
