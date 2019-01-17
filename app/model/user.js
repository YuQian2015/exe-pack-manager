module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const UserSchema = new Schema({
        name: String, // 姓名
        sex: {
            type: Number,
            default: 1
        }, // 性别 1男 2女
        tel: String, // 用户电话号码
        userCode: String, // 用户编号
        password: String, // 用户密码
        createDate: Date, // 创建时间
        updateDate: Date, // 修改时间
    });
    return mongoose.model('User', UserSchema);
};