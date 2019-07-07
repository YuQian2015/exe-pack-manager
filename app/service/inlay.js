const Service = require('egg').Service;

class InlayService extends Service {
    async findInlay(params = {}) {
        return new Promise((resolve, reject) => {
            this.ctx.model.Inlay.find(params).sort('-createDate').lean().exec((err, docs) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
        })
    }

    async createInlay(data) {
        return new Promise(async (resolve, reject) => {
            this.ctx.model.Inlay({
                ...data
            }).save((err, data) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return
                }
                resolve(data)
            });
        })
    }
}

module.exports = InlayService;
