module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const PackSchema = new Schema({
        tenants: [{ type: Schema.Types.ObjectId, ref: 'Tenant' }], // 打包租户
        type: Number, // 打包类型
        createDate: Date, // 创建时间
        updateDate: Date, // 修改时间
    });
    PackSchema.pre('find', function() {
        this.populate('tenants', 'tenantId appName');
    });
    return mongoose.model('Pack', PackSchema);
};