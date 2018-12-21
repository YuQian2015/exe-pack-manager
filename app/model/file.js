module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const FileSchema = new Schema({
        fileName: String, // 文件名
        type: String, // 文件类型
        size: Number, // 文件大小
        url:  String, // 文件url地址
        createDate: Date, // 创建时间
        updateDate: Date, // 修改时间
    });
    return mongoose.model('File', FileSchema);
}