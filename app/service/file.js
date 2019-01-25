const Service = require('egg').Service;

class FileService extends Service {
    async createFile(data) {

        return new Promise(async (resolve, reject) => {
            this.ctx.model.File({
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


    async findFile(params) {

        const pageSize = params && parseInt(params.pageSize) || 10; // 使用分页
        const page = params && parseInt(params.page) || 1;

        return new Promise((resolve, reject) => {
            this.ctx.model.File.find({}).limit(pageSize).skip(pageSize * (page - 1)).lean().exec((err, docs) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    this.ctx.model.File.find({}).count().exec((error, count) => {
                        if (error) {
                            resolve({list: docs});
                        } else {
                            resolve({list: docs, count: count});
                        }
                    });
                }
            });
        })
    }

    async findOneFile(params = {}) {
        return new Promise((resolve, reject) => {
            this.ctx.model.File.findOne(params).lean().exec((err, docs) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
        })
    }


    async deleteFile(id) {

        return new Promise((resolve, reject) => {
            this.ctx.model.File.remove({
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

module.exports = FileService;