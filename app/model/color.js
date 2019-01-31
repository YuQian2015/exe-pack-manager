module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const ColorSchema = new Schema({
        tenantId: String, // 租户ID
        tenantInfo: { type: Schema.Types.ObjectId, ref: 'Tenant' }, // 租户ID
        colors: Object, // 颜色
        createDate: Date, // 创建时间
        updateDate: Date, // 修改时间
    });
    ColorSchema.pre('find', function () {
        this.populate('tenantInfo', 'valid tenantName actualTenantId');
    });
    return mongoose.model('Color', ColorSchema);
};
