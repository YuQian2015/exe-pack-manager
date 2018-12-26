const Service = require('egg').Service;

class TenantService extends Service {
    async createTenant(data) {

        return new Promise(async (resolve, reject) => {
            const tenant = await this.findTenant({tenantId: data.tenantId});
            if(tenant.length) {
                reject('该租户已经存在');
                return
            }
            this.ctx.model.Tenant({
                tenantName: '职行力',
                appName: '职行力',
                tenantId: 'exe',
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

    async findTenant(params = {}) {

        return new Promise((resolve, reject) => {
            this.ctx.model.Tenant.find(params).lean().exec((err, docs) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
        })
    }

    async findOneTenant(params = {}) {

        return new Promise((resolve, reject) => {
            this.ctx.model.Tenant.findOne(params).lean().exec((err, docs) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    docs.createDate = docs.createDate;
                    resolve(docs);
                }
            });
        })
    }
    
    async updateOneTenant(condition = {}, doc) {
        return new Promise((resolve, reject) => {
            // .update(condition,doc,[options],[callback]);
            this.ctx.model.Tenant.updateOne(condition, doc).lean().exec((err, docs) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
        })
    }

    

    async deleteTenant(id) {

        return new Promise((resolve, reject) => {
            this.ctx.model.Tenant.remove({
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

module.exports = TenantService;