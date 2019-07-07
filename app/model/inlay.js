module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const InlaySchema = new Schema({
        tenant: { type: Schema.Types.ObjectId, ref: 'Tenant' }, // 租户ID
        features: [{ type: Schema.Types.ObjectId, ref: 'Tenant' }], // 对接的功能
        name: String, // 平台名称
        createDate: {
            type: Date,
            default: new Date()
        }, // 创建时间
        updateDate: {
            type: Date,
            default: new Date()
        }, // 修改时间
    });
    return mongoose.model('Inlay', InlaySchema);
}