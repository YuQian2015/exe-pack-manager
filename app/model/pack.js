module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const PackSchema = new Schema({
        tenants: [{ type: Schema.Types.ObjectId, ref: 'Tenant' }], // 打包租户
        type: Number, // 打包类型
        note: String, // 备注
        title: String, // 标题
        active: {
            type: Boolean,
            default: false
        }, // 是否被激活打包
        complete: {
            type: Boolean,
            default: false
        },
        createDate: Date, // 创建时间
        updateDate: Date, // 修改时间
    });
    PackSchema.pre('find', function() {
        this.populate('tenants', 'tenantId appName icon');
    });
    PackSchema.pre('findOne', function() {
        this.populate('tenants', 'tenantId appName');
    });
    return mongoose.model('Pack', PackSchema);
};
