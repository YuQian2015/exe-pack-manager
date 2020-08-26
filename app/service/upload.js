
const Service = require('egg').Service;
//node.js 文件操作对象
const fs = require('fs');
//node.js 路径操作对象
const path = require('path');
// 异步二进制 写入流
const awaitWriteStream = require('await-stream-ready').write;
//管道读入一个虫洞。
const sendToWormhole = require('stream-wormhole');

const { getJsDateFromExcel } = require("excel-date-to-js");
const parseXlsx = require("excel");

const { keyMap, statusMap } = require('../constant');

class UploadService extends Service {
    async uploadHiring() {
        const ctx = this.ctx;
        const map = [];
        let stream;
        try {
            stream = await ctx.getFileStream();
            const name = stream.filename;
            const newName = 'upload/' + new Date().getTime() + '.' + this.getFileType(name);
            const writeStream = fs.createWriteStream(newName);
            // 以管道方式写入流
            // 异步把文件流写入
            await awaitWriteStream(stream.pipe(writeStream));

            const excelData = await parseXlsx.default(newName);
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

    getFileType(filePath) {
        let startIndex = filePath.lastIndexOf(".");
        if (startIndex != -1)
            return filePath.substring(startIndex + 1, filePath.length).toLowerCase();
        else return "";
    }
}

module.exports = UploadService;
