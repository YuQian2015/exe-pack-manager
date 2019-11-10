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
    }, { timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' } });
    UserSchema.pre('find', function () {
        this.populate('role', 'name');
    });
    UserSchema.pre('findOne', function () {
        this.populate('role', 'name');
    });
    return mongoose.model('User', UserSchema);
};