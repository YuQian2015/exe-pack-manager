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
    }, { timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' } });
    return mongoose.model('Team', TeamSchema);
};
