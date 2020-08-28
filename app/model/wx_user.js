module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const WxUserSchema = new Schema({
        name: String, // 姓名
        sex: {
            type: Number,
            default: 1
        }, // 性别 1男 2女
        userType: { // 用户类型 0 访客 1 正式
            type: Number,
            default: 0
        },
        tel: String, // 用户电话号码
        openId: String, // 用户 openId
    }, { timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' } });
    return mongoose.model('WxUser', WxUserSchema);
};