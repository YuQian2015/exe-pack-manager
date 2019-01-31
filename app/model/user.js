module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const UserSchema = new Schema({
        name: String, // 姓名
        sex: {
            type: Number,
            default: 1
        }, // 性别 1男 2女
        role: { type: Schema.Types.ObjectId, ref: 'Role' },
        tel: String, // 用户电话号码
        userId: String, // 用户Id
        tenantId: String, // 租户ID
        password: String, // 用户密码
        createDate: Date, // 创建时间
        updateDate: Date, // 修改时间
    });
    return mongoose.model('User', UserSchema);
};