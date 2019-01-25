const Controller = require('egg').Controller;
//node.js 文件操作对象
const fs = require('fs');
//node.js 路径操作对象
const path = require('path');
// 异步二进制 写入流
const awaitWriteStream = require('await-stream-ready').write;
//管道读入一个虫洞。
const sendToWormhole = require('stream-wormhole');

class UploadController extends Controller {
    async uploadImage() {
        const ctx = this.ctx;
        //egg-multipart 已经帮我们处理文件二进制对象
        // node.js 和 php 的上传唯一的不同就是 ，php 是转移一个 临时文件
        // node.js 和 其他语言（java c#） 一样操作文件流
        let result;
        const stream = await ctx.getFileStream();

        const name = stream.filename;

        // const writeStream = fs.createWriteStream('app/public/uploads/'+stream.filename);
        try {
            //异步把文件流 写入
            // await awaitWriteStream(stream.pipe(writeStream));
            // const newFile = await this.ctx.service.file.createFile({
            //     fileName: stream.filename, // 文件名
            //     type: stream.mimeType, // 文件类型
            //     url:  '/public/uploads/' + name, // 文件url地址
            // });
            // ctx.body = {
            //     code: 200,
            //     data: newFile,
            //     success: true,
            //     msg: `上传成功`
            // }

            // 图片上传七牛
            result = await ctx.app.fullQiniu.uploadStream(name, stream);
            if(result.ok) {
                const newFile = await ctx.service.file.createFile({
                    fileName: stream.filename, // 文件名
                    type: stream.mimeType, // 文件类型
                    url:  result.url, // 文件url地址
                });
                ctx.body = {
                    code: 200,
                    data: newFile,
                    success: true,
                    msg: `上传成功`
                }
            }
            console.log(result);
        } catch (err) {
            //如果出现错误，关闭管道
            // await sendToWormhole(stream);
            throw err;
        }
    }

    async deleteImage() {
        const ctx = this.ctx;
        console.log(ctx.params.id)
        try {


            const file = await ctx.service.file.findOneFile({_id: ctx.params.id});
            // delete(key)
            // const result = await ctx.app.fullQiniu.batchFileInfo([file.fileName]);
            const result = await ctx.app.fullQiniu.delete(file.fileName);
            if(result.ok) {
                const delResult = await ctx.service.file.deleteFile(ctx.params.id);
                if(delResult.ok === 1) {
                    ctx.body = {
                        code: 200,
                        data: {},
                        success: true,
                        msg: `删除成功`
                    }
                }
            } else {
                throw new Error('查找CDN上的文件失败');
            }
        } catch (err) {
            throw err;
        }
    }

}
module.exports = UploadController;