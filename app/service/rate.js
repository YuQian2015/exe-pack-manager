const Service = require('egg').Service;

class RateService extends Service {
    async createRate(data) {
        return new Promise(async (resolve, reject) => {
            this.ctx.model.Rate({
                createDate: new Date(), // 创建时间
                updateDate: new Date(), // 修改时间
                ...data
            }).save((err, data) => {
                if (err) {
                    console.log(err)
                    reject(err);
                    return
                }
                resolve(data)
            });
        })
    }

    async findRate(params = {}) {

        return new Promise((resolve, reject) => {
            this.ctx.model.Rate.find(params).lean().exec((err, docs) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
        })
    }
}

module.exports = RateService;
