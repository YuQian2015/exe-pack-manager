module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const RoleSchema = new Schema({
        name: String, // 角色
        createDate: Date, // 创建时间
        updateDate: Date, // 修改时间
    });
    return mongoose.model('Role', RoleSchema);
};