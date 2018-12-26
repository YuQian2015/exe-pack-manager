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


    async findFile() {

        return new Promise((resolve, reject) => {
            this.ctx.model.File.find({}).lean().exec((err, docs) => {
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