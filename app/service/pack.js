const Service = require('egg').Service;


class PackService extends Service {

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