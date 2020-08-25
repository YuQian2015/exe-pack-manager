const Controller = require('egg').Controller;
//node.js 文件操作对象
const fs = require('fs');
//node.js 路径操作对象
const path = require('path');
// 异步二进制 写入流
const awaitWriteStream = require('await-stream-ready').write;
//管道读入一个虫洞。
const sendToWormhole = require('stream-wormhole');

const parseXlsx = require("excel");
const { getJsDateFromExcel } = require("excel-date-to-js");

const unzipper = require('unzipper');

const FolderScanner = require('@moyufed/folder-scanner');
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
            result = await ctx.app.fullQiniu.uploadStream('exe-pack-manager/icons/' + name, stream);
            if (result.ok) {
                const newFile = await ctx.service.file.createFile({
                    fileName: stream.filename, // 文件名
                    type: stream.mimeType, // 文件类型
                    url: result.url, // 文件url地址
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


            const file = await ctx.service.file.findOneFile({ _id: ctx.params.id });
            // delete(key)
            // const result = await ctx.app.fullQiniu.batchFileInfo([file.fileName]);
            const fileAddress = file.url.replace(/https?:\/\/[\s\S]*com\//, '')
            const result = await ctx.app.fullQiniu.delete(fileAddress);
            if (result.ok) {
                const delResult = await ctx.service.file.deleteFile(ctx.params.id);
                if (delResult.ok === 1) {
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

    /**
     * [saveFileWithStream description]
     * @param {String} filePath [文件路径]
     * @param {Buffer} readData [Buffer 数据]
     */
    // static saveFile(filePath, fileData) {
    //     return new Promise((resolve, reject) => {
    //         // 块方式写入文件
    //         const wstream = fs.createWriteStream(filePath);

    //         wstream.on('open', () => {
    //             const blockSize = 128;
    //             const nbBlocks = Math.ceil(fileData.length / (blockSize));
    //             for (let i = 0; i < nbBlocks; i += 1) {
    //                 const currentBlock = fileData.slice(
    //                     blockSize * i,
    //                     Math.min(blockSize * (i + 1), fileData.length),
    //                 );
    //                 wstream.write(currentBlock);
    //             }

    //             wstream.end();
    //         });
    //         wstream.on('error', (err) => { reject(err); });
    //         wstream.on('finish', () => { resolve(true); });
    //     });
    // }
    // try {
    //     await saveFileWithStream(filePath, fileData); // 这里的fileData是Buffer类型
    // } catch (err) {
    //     console.log(err.stack);
    // }
    unzipPackage(stream, path) {
        return new Promise((resolve, reject) => {
            stream.pipe(unzipper.Extract({ path }))
                .on('entry', entry => {
                })
                .on("close", data => {
                    console.log("解压成功");
                    resolve(true);
                })
                .on('error', e => {
                    reject(e);
                });
        })
    }
    async uploadPackage() {
        let result;
        const ctx = this.ctx;
        const stream = await ctx.getFileStream();
        const id = stream.fields.id;
        const name = stream.filename;
        try {
            if (id) {
                const cdn = await ctx.model.Cdn.findOne({ _id: id });
                const folder = ['app', 'app', 'wx', 'qywx', 'dd', 'embed', 'pc'];
                const type = cdn ? cdn.type : 5;
                const tenantId = cdn ? cdn.tenantId : 'unknown';
                const unzipResult = await this.unzipPackage(stream, path.join('fileTemp', folder[type]));
                if (unzipResult === true) {
                    console.log("解压成功");
                    ctx.body = {
                        code: 200,
                        data: {},
                        success: true,
                        msg: `上传成功`
                    }
                    // const folderScanner = new FolderScanner({
                    //     location: 'fileTemp',
                    //     rootFolder: name.split('.zip')[0]
                    // });
                    // const files = JSON.parse(folderScanner.getFiles().replace(',]', ']'))
                    // console.log(files.length);
                    // const res = await ctx.app.fullQiniu.uploadFile('package' + files[0], path.resolve('fileTemp' + files[0]));
                    // console.log(res);
                }
            } else {
                throw new Error('缺少站点ID');
            }

            // const uploadPath = 'uploadTemp/';
            // if (!fs.existsSync(uploadPath)) {
            //     fs.mkdirSync(uploadPath);
            // }
            // const writeStream = fs.createWriteStream(uploadPath + name);
            // writeStream.on('finish', () => {
            //     console.log(3);
            // });
            // console.log(1);
            // await awaitWriteStream(stream.pipe(writeStream));
            // console.log(2);
            // fs.createReadStream(uploadPath + name).pipe(unzipper.Extract({ path: 'fileTemp' }))
            //     .on('entry', function (entry) {
            //     })
            //     .on("close", function (data) {
            //         console.log("解压成功,查找字体…");
            //     })


            // 图片上传七牛
            // result = await ctx.app.fullQiniu.uploadStream('package/' + new Date().getTime() + '-' + name, stream);

            // if (result.ok) {
            //     const newFile = await ctx.service.file.createFile({
            //         fileName: name, // 文件名
            //         type: stream.mimeType, // 文件类型
            //         url: result.url, // 文件url地址
            //     });
            //     ctx.body = {
            //         code: 200,
            //         data: newFile,
            //         success: true,
            //         msg: `上传成功`
            //     }
            // }
            // console.log(result);
        } catch (err) {
            //如果出现错误，关闭管道
            await sendToWormhole(stream);
            throw err;
        }

    }

    getFileType(filePath) {
        let startIndex = filePath.lastIndexOf(".");
        if (startIndex != -1)
            return filePath.substring(startIndex + 1, filePath.length).toLowerCase();
        else return "";
    }

    async uploadHiring() {
        let keyMap = {
            '状态': 'status',
            '姓名': 'name',
            '应聘岗位': 'job',
            '招聘分部': 'area',
            '直接上级': 'superior',
            '联系电话': 'tel',
            '邮箱地址': 'email',
            '发送简历时间': 'sendDate',
            '收到反馈时间': 'receiveDate',
            '简历反馈时长（天）': 'feedbackTime',
            '面试时长(小时）': 'interviewTime',
            '评估反馈时长（天）': 'evaluationTime',
            '渠道': 'channel',
            '推荐人': 'recommender',
            '渠道成本（元）': 'channelCost',
            '录用意见': 'opinion',
            '不面试理由': 'refusingInterviewReasons',
            '不录用理由分类': 'reasonClassification',
            '不录用具体理由': 'reasons',
            '拒绝offer理由分类': 'refusingReasonClassification',
            '拒绝具体理由': 'refusingReasons',
            '备注': 'remark',
            '面试修改次数': 'interviewChangeCount'
        };
        const map = [];

        const statusMap = { "不面试": 1, "不面试先储备": 2, "待面试": 3, "已面试待定结论": 4, "已面试并储备": 5, "不录用": 6, "拒绝offer": 7, "接受offer": 8, "试用期离职": 9 };
        let result;
        const ctx = this.ctx;
        let stream;
        try {
            stream = await ctx.getFileStream();
            const name = stream.filename;
            console.log(stream);
            const newName = 'upload/' + new Date().getTime() + '.' + this.getFileType(name);
            const writeStream = fs.createWriteStream(newName);
            // 以管道方式写入流
            // 异步把文件流写入
            await awaitWriteStream(stream.pipe(writeStream));

            const excelData = await parseXlsx.default(newName);
            const documentCount = excelData.length;
            let resultJson = [];
            let checkKey = true;
            for (let index in excelData) {
                if (index == 0) {
                    let theKeys = excelData[0];
                    for (let keyIndex in theKeys) {
                        const keyName = theKeys[keyIndex];
                        if (keyName && !keyMap[keyName]) {
                            // throw new Error(`导入的字段 '${keyName}' 不被支持！`)
                            ctx.body = {
                                code: 200,
                                data: `第 ${parseInt(keyIndex) + 1} 列的导入的字段 '${keyName}' 不被支持，请检查或联系管理员！`,
                                success: false,
                                msg: `上传失败`
                            }
                            checkKey = false;
                            break
                        }
                        map.push(keyMap[keyName])
                    }
                }
                if (!checkKey) {
                    break
                }
                // let firstKey = index[0];
                if (index > 0) {
                    console.log(index);
                    const rowData = {};
                    for (let i in excelData[index]) {
                        // rowData[excelData[0][i]] = excelData[index][i];
                        const key = map[i]
                        if (key) {
                            if (key === 'sendDate') {
                                const date = excelData[index][i];
                                if (date) {
                                    rowData[key] = getJsDateFromExcel(date)
                                }
                            } else if (key === 'receiveDate') {
                                const date = excelData[index][i];
                                if (date) {
                                    rowData[key] = getJsDateFromExcel(date)
                                }
                            } else if (key === 'status') {
                                const state = excelData[index][i];
                                rowData[key] = statusMap[state]
                            } else if (key === 'channelCost') {
                                const cost = excelData[index][i] || 0;
                                if (!/^[0-9.]*$/g.test(cost)) {
                                    throw new Error(`第 ${parseInt(index) + 1} 行及以后的数据导入失败， 第 ${parseInt(index) + 1} 行 '渠道成本' 数值 '${cost}' 错误，请核对！`);
                                }
                                rowData[key] = cost
                            } else {
                                rowData[key] = excelData[index][i];
                            }
                        }
                    }
                    await ctx.service.hiring.createHiring(rowData);
                    resultJson.push(rowData);
                }
            }
            if (!checkKey) {
                return
            }
            fs.writeFileSync('upload/result.json', JSON.stringify(resultJson));
            ctx.body = {
                code: 200,
                data: {},
                success: true,
                msg: `上传成功`
            }
        } catch (err) {
            //如果出现错误，关闭管道
            stream && await sendToWormhole(stream);
            ctx.body = {
                code: 200,
                data: err,
                success: false,
                msg: `上传失败`
            }
            throw err;
        }

    }
}
module.exports = UploadController;