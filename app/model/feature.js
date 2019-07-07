module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const FeatureSchema = new Schema({
        name: String, // 特性名称
        icon: String, // 特性图标
        createDate: {
            type: Date,
            default: new Date()
        }, // 创建时间
        updateDate: {
            type: Date,
            default: new Date()
        }, // 修改时间
    });
    return mongoose.model('Feature', FeatureSchema);
}