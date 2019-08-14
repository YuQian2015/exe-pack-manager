module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const TeamSchema = new Schema({
        name: String, // 角色
        type: { // 活动分类
            type: Number,
            default: 0
        },
        slogan: String,
        desc: String,
        members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        logo: String,
        activityId: String,
        createDate: Date, // 创建时间
        updateDate: Date, // 修改时间
    });
    return mongoose.model('Team', TeamSchema);
};
