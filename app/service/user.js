
const Service = require('egg').Service;


class UserService extends Service {
    async createUser(data) {
        return new Promise(async (resolve, reject) => {
            this.ctx.model.User({
                createDate: new Date(), // 创建时间
                updateDate: new Date(), // 修改时间
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

    async findUser(params = {}) {
        return new Promise((resolve, reject) => {
            this.ctx.model.User.find(params).sort('-createDate').lean().exec((err, docs) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
        })
    }

    async findOneUser(params = {}) {
        return new Promise((resolve, reject) => {
            this.ctx.model.User.findOne(params).lean().exec((err, doc) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(doc);
                }
            });
        })
    }

    async updateOneUser(condition = {}, doc) {
        return new Promise((resolve, reject) => {
            // .update(condition,doc,[options],[callback]);
            this.ctx.model.User.updateOne(condition, doc).lean().exec((err, docs) => {
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

module.exports = UserService;
