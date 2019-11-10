

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;


    const dataSchema = new Schema({
        key: String, // 键
        value: String, // 值
        note: String, // 备注
    });

    const KeeperSchema = new Schema({
        name: String, // 名称
        website: String, // 网址
        data: [dataSchema], // 保存的data
        type: Number, // 类型
        note: String, // 描述
    }, { timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' } });
    return mongoose.model('Keeper', KeeperSchema);
};