
const Service = require('egg').Service;


class TimelineService extends Service {
    async createTimeline(data) {
        return new Promise(async (resolve, reject) => {
            this.ctx.model.Timeline({
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

    async findTimeline(params = {}) {
        return new Promise((resolve, reject) => {
            this.ctx.model.Timeline.find(params).sort('-createDate').lean().exec((err, docs) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
        })
    }

    async updateOneTimeline(condition = {}, doc) {
        return new Promise((resolve, reject) => {
            // .update(condition,doc,[options],[callback]);
            this.ctx.model.Timeline.updateOne(condition, doc).lean().exec((err, docs) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
        })
    }

    async deleteTimeline(id) {
        return new Promise((resolve, reject) => {
            this.ctx.model.Timeline.remove({
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

module.exports = TimelineService;
