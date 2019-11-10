module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const FeatureSchema = new Schema({
        name: String, // 特性名称
        icon: String, // 特性图标
    }, { timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' } });
    return mongoose.model('Feature', FeatureSchema);
}