const Service = require('egg').Service;


class PackService extends Service {
    async createPack(data) {
        return new Promise(async (resolve, reject) => {
            if(!data.type) {
                reject(new Error(`没有选择打包类型`));
            }
            if(!data.tenants || data.tenants.length === 0) {
                reject(new Error(`没有选择打包租户`));
            }
            this.ctx.model.Pack({
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

    async findPack(params = {}) {
        return new Promise((resolve, reject) => {
            this.ctx.model.Pack.find(params).sort('-createDate').lean().exec((err, docs) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
        })
    }

    async findAutoPack(params = {}) {
        return new Promise((resolve, reject) => {
            this.ctx.model.Pack.findOne(params).where({ active: true }).sort('-createDate').lean().exec((err, docs) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
        })
    }

    async findTenant(filter = {app: true}) {

        return new Promise((resolve, reject) => {
            this.ctx.model.Tenant.find( ).nor([{isCommon: true},{valid: false}]).and([filter]).sort('tenantId').lean().exec((err, docs) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
        })
    }


    async updatePack(body) {

        return new Promise((resolve, reject) => {
            // 如果有计数，则对序列值进行自增,如果没有则创建
            // 问题地址 https://stackoverflow.com/questions/32811510/mongoose-findoneandupdate-doesnt-return-updated-document
            // The default is to return the original, unaltered document.
            // If you want the new, updated document to be returned you have to pass an additional argument:
            // an object with the new property set to true.
            // Model.findOneAndUpdate(conditions, update, options, (error, doc) => {
            //   // error: any errors that occurred
            //   // doc: the document before updates are applied if `new: false`, or after updates if `new = true`
            // });
            // Available options
            //
            // new: bool - if true, return the modified document rather than the original. defaults to false (changed in 4.0)

            // 文档地址
            // https://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate
            this.ctx.model.Pack.findOneAndUpdate({
                type: body.type // 打包类型
            }, {
                $set: {
                    createDate: new Date(), // 创建时间
                    updateDate: new Date(), // 修改时间
                    tenants: body.tenants
                }
            }, {
                new: true, // if true, return the modified document rather than the original. defaults to false (changed in 4.0)
                upsert: true // bool - creates the object if it doesn't exist. defaults to false.
            }, (err, doc) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(doc);
                }
            })
        })
    }


    async updateOnePack(condition = {}, doc) {
        return new Promise((resolve, reject) => {
            // .update(condition,doc,[options],[callback]);
            this.ctx.model.Pack.updateOne(condition, doc).lean().exec((err, docs) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
        })
    }

    async deletePack(id) {
        return new Promise((resolve, reject) => {
            this.ctx.model.Pack.remove({
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

module.exports = PackService;