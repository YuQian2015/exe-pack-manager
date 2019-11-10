module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const FileSchema = new Schema({
        fileName: String, // 文件名
        type: String, // 文件类型
        size: Number, // 文件大小
        url:  String, // 文件url地址
    }, { timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' } });
    return mongoose.model('File', FileSchema);
}