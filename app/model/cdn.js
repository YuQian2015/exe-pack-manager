module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const CdnSchema = new Schema({
        name: {
            type: String,
            required: true
        }, // CDN项目地址名称
        tenantId: {
            type: String,
            required: true
        }, // 租户ID
        version: {
            type: String,
            required: true
        }, // 版本
        homePage: {
            type: String,
            required: true
        }, // 首页入口
        authPage: {
            type: String,
            required: true
        }, // 存放版本页面的地址
        resource: {
            type: String,
            required: true
        }, // 资源存放地址
        type: {
            type: Number,
            default: 2
        }, // 1:测试 2:正式
    }, { timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' } });
    return mongoose.model('Cdn', CdnSchema);
}