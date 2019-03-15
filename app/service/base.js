class BaseService {
    constructor(model) {
        this.model = model;
    }
    async create() {
        console.log(this.model);
    }

    /**
     * 通用的查找，支持分页，默认pageSize为10，page为1，时间倒序排列
     * @param params 查询参数
     * @returns {Promise<*>}
     */
    async find(params) {
        const pageSize = params && parseInt(params.pageSize) || 10; // 使用分页
        const page = params && parseInt(params.page) || 1;
        delete params.pageSize;
        delete params.page;
        return new Promise((resolve, reject) => {
            this.model.find(params).limit(pageSize).skip(pageSize * (page - 1)).sort('-createDate').lean().exec((err, docs) => {
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
module.exports = BaseService;