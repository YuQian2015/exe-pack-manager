module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const RoleSchema = new Schema({
        name: String, // 角色
    }, { timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' } });
    return mongoose.model('Role', RoleSchema);
};