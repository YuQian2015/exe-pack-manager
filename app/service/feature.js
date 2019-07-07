const Service = require('egg').Service;

class FeatureService extends Service {
    async findFeature(params = {}) {
        return new Promise((resolve, reject) => {
            this.ctx.model.Feature.find(params).sort('-createDate').lean().exec((err, docs) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
        })
    }

    async createFeature(data) {
        return new Promise(async (resolve, reject) => {
            this.ctx.model.Feature({
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

module.exports = FeatureService;
