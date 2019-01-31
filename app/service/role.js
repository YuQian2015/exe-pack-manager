const Service = require('egg').Service;


class RoleService extends Service {
    async createRole(data) {
        return new Promise(async (resolve, reject) => {
            this.ctx.model.Role({
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

    async findRole(params = {}) {
        return new Promise((resolve, reject) => {
            this.ctx.model.Role.find(params).sort('-createDate').lean().exec((err, docs) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(docs);
                }
            })
        })
    }
    async findOneRole(params = {}) {

        return new Promise((resolve, reject) => {
            this.ctx.model.Role.findOne(params).lean().exec((err, doc) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(doc);
                }
            });
        })
    }

    async updateOneRole(condition = {}, doc) {
        return new Promise((resolve, reject) => {
            // .update(condition,doc,[options],[callback]);
            this.ctx.model.Role.updateOne(condition, doc).lean().exec((err, docs) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
        })
    }

    async deleteRole(id) {
        return new Promise((resolve, reject) => {
            this.ctx.model.Role.remove({
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

module.exports = RoleService;