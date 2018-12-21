module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const TenantSchema = new Schema({
        tenantId: String, // 租户ID
        appName: { // 省份 默认职行力
            type: String,
            default: '职行力'
        },
        tenantName: { // 租户名称
            type: String
        },
        province: { // 省份 默认福建
            type: String,
            default: '福建'
        },
        icon: String, // LOGO
        address: String, // 地址
        isCommon: Boolean, // 通用包租户
        isCustomized: Boolean, // 有定制内容
        app: Boolean, // app版
        wx: Boolean, // 微信版
        workWx: Boolean, // 企业微信版
        dd: Boolean, // 钉钉版
        inlay: Boolean, // 内嵌版
        pc: Boolean, // PC版
        description: String, // 描述
        isLocked: { // 锁定
            type: Boolean,
            default: false
        }, 
        createDate: Date, // 创建时间
        updateDate: Date // 修改时间
    });
    return mongoose.model('Tenant', TenantSchema);
}