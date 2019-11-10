module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const TenantSchema = new Schema({
        tenantId: String, // 租户ID
        actualTenantId: { // 租户使用ID
            type: String
        },
        appName: { // 默认职行力
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
        isCommon: {
            type: Boolean,
            default: false
        }, // 通用包租户
        isCustomized: {
            type: Boolean,
            default: false
        }, // 有定制内容
        app: {
            type: Boolean,
            default: false
        }, // app版
        wx: {
            type: Boolean,
            default: false
        }, // 微信版
        workWx: {
            type: Boolean,
            default: false
        }, // 企业微信版
        dd: {
            type: Boolean,
            default: false
        },  // 钉钉版
        inlay: {
            type: Boolean,
            default: false
        }, // 内嵌版
        pc: {
            type: Boolean,
            default: false
        }, // PC版
        version: Number, // 版本 v2:2 v3:3 
        description: String, // 描述
        valid: { // 有效
            type: Boolean,
            default: true
        },
        theme: { type: Schema.Types.ObjectId, ref: 'Theme' }, // 主题
        isLocked: { // 锁定
            type: Boolean,
            default: false
        }
    }, { timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' } });
    TenantSchema.pre('findOne', function () {
        this.populate('theme', 'brand primary secondary');
    });
    TenantSchema.pre('find', function () {
        this.populate('theme', 'brand primary secondary');
    });
    return mongoose.model('Tenant', TenantSchema);
}
