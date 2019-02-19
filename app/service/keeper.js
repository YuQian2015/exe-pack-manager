const Service = require('egg').Service;

class KeeperService extends Service {
    async createKeeper(data) {

        return new Promise(async (resolve, reject) => {
            this.ctx.model.Keeper({
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

    async findKeeper(params = {}) {

        return new Promise((resolve, reject) => {
            this.ctx.model.Keeper.find(params).lean().exec((err, docs) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
        })
    }

    async findOneKeeper(params = {}) {

        return new Promise((resolve, reject) => {
            this.ctx.model.Keeper.findOne(params).lean().exec((err, docs) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
        })
    }


    async deleteKeeper(id) {

        return new Promise((resolve, reject) => {
            this.ctx.model.Keeper.remove({
                _id: id
            }).lean().exec((err, docs) => {
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

module.exports = KeeperService;
