module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const TimelineSchema = new Schema({
        content: String, // 内容
        tenantKey: String, // 租户ID
        creator: String, // 创建者
    }, { timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' } });
    TimelineSchema.pre('save',  function (next) {
        console.log(this.updateDate);
        next();
    });
    return mongoose.model('Timeline', TimelineSchema);
};
