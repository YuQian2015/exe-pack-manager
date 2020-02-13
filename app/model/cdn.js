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
        }, // 租户目录ID
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
        rule: {
            type: String,
            required: true
        }, // 正则替换规则
        type: {
            type: Number,
            default: 5
        }, // 1 APP 2:微信 3:企业微信 4: 钉钉 5:内嵌 6: PC
    }, { timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' } });
    return mongoose.model('Cdn', CdnSchema);
}