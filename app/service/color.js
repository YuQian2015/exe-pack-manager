const Service = require('egg').Service;


class ColorService extends Service {
    async createColor(data) {

        return new Promise(async (resolve, reject) => {
            this.ctx.model.Color({
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

    async findColor(params = {}) {
        return new Promise((resolve, reject) => {
            this.ctx.model.Color.find(params).sort('-createDate').lean().exec((err, docs) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
        })
    }

    async findTestPackColor(params = {}) {
        return new Promise((resolve, reject) => {
            this.ctx.model.Pack.find(params).sort('-createDate').lean().exec((err, packs) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    let tenants = [];
                    packs.forEach(item => {
                        tenants = tenants.concat(item.tenants.map( i => i.tenantId === 'exe'?'common':i.tenantId));
                        //Set数据结构，它类似于数组，其成员的值都是唯一的, 用来去重
                        tenants = Array.from(new Set(tenants)); // 利用Array.from将Set结构转换成数组
                    });
                    if(tenants.length) {
                        this.ctx.model.Color.find({}).where({ tenantId: { "$in" : tenants}}).sort('-createDate').lean().exec((err, docs) => {
                            if (err) {
                                console.log(err);
                                reject(err);
                            } else {
                                resolve(docs);
                            }
                        });
                    }
                }
            });


        })
    }

    async findOneColor(params = {}) {
        return new Promise((resolve, reject) => {
            this.ctx.model.Color.findOne(params).lean().exec((err, doc) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(doc);
                }
            });
        })
    }

    async updateOneColor(condition = {}, doc) {
        return new Promise((resolve, reject) => {
            // .update(condition,doc,[options],[callback]);
            this.ctx.model.Color.updateOne(condition, doc).lean().exec((err, docs) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
        })
    }

    async deleteColor(id) {
        return new Promise((resolve, reject) => {
            this.ctx.model.Color.remove({
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

module.exports = ColorService;
