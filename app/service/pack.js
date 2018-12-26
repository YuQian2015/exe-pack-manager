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
            this.ctx.model.Pack.find(params).lean().exec((err, docs) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
        })
    }

    async findTenant() {

        return new Promise((resolve, reject) => {
            this.ctx.model.Tenant.find({}).lean().exec((err, docs) => {
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