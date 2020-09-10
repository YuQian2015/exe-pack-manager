module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const WxUserSchema = new Schema({
        name: String, // 姓名
        userType: { // 用户类型 0 访客 1 正式
            type: Number,
            default: 0
        },
        gender: {
            type: Number,
            default: 1
        }, // WX用户 性别 1男 2女
        avatarUrl: String, // WX用户 用户头像
        tel: String, // 用户电话号码
        openId: String, // WX用户 openId
        nickName: String, // WX用户 昵称
        city: String, // WX用户 城市
        province: String, // WX用户 省
        country: String, // WX用户 国家
        language: String, // WX用户 语言
    }, { timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' } });
    return mongoose.model('WxUser', WxUserSchema);
};