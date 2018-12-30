const Service = require('egg').Service;


class ThemeService extends Service {
    async createTheme(data) {
        return new Promise(async (resolve, reject) => {
            this.ctx.model.Theme({
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

    async findTheme(params = {}) {
        return new Promise((resolve, reject) => {
            this.ctx.model.Theme.find(params).sort('-createDate').lean().exec((err, docs) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
        })
    }

    async updateOneTheme(condition = {}, doc) {
        return new Promise((resolve, reject) => {
            // .update(condition,doc,[options],[callback]);
            this.ctx.model.Theme.updateOne(condition, doc).lean().exec((err, docs) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
        })
    }

    async deleteTheme(id) {
        return new Promise((resolve, reject) => {
            this.ctx.model.Theme.remove({
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

module.exports = ThemeService;
