module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const InlaySchema = new Schema({
        tenant: { type: Schema.Types.ObjectId, ref: 'Tenant' }, // 租户ID
        features: [{ type: Schema.Types.ObjectId, ref: 'Tenant' }], // 对接的功能
        name: String, // 平台名称
    }, { timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' } });
    return mongoose.model('Inlay', InlaySchema);
}