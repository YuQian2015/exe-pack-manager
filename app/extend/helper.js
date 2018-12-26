const moment = require('moment');
// const qiniu = require('qiniu');

exports.relativeTime = time => moment(new Date(time * 1000)).fromNow();
exports.formatTime = date => moment(date).format('YYYY-MM-DD HH:mm:ss');
exports.formatDate = date => moment(date).format('YYYY-MM-DD');

const packType = ['App', '微信版', '企业微信', '钉钉版', '内嵌版', 'PC版'];
exports.getPackType = type => packType[type - 1];


//
// 七牛上传
// const fs = require('fs');
//
//
// const accessKey = 'Y3Yp083X9R5vnYca10N8DkpNq4q1zoxrtNip1Ptf';
// const secretKey = '1yVv5hqxplLYoVTwBAJwjV2GWwTSHNDEYu1AE0Iw';
// const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
//
// const options = {
//     scope: 'healthy-diet',
//     expires: 7200,
//     returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}',
//     callbackBodyType: 'application/json'
// };
// const putPolicy = new qiniu.rs.PutPolicy(options);
// const uploadToken = putPolicy.uploadToken(mac);
//
// const formUploader = new qiniu.form_up.FormUploader(options);
// const putExtra = new qiniu.form_up.PutExtra();
//
// // module.exports = (key, readableStream) => {
// module.exports = (key, localFile) => {
//     console.log("开始上传图片");
//     // 文件上传
//     // formUploader.putStream(uploadToken, key, readableStream, putExtra, function(respErr,
//     //                                                                             respBody, respInfo) {
//     //     if (respErr) {
//     //         console.log(respErr);
//     //         throw respErr;
//     //     }
//     //     if (respInfo.statusCode == 200) {
//     //         console.log(respBody);
//     //     } else {
//     //         console.log(respInfo.statusCode);
//     //         console.log(respBody);
//     //     }
//     // });
//
//
//     // 文件上传
//     formUploader.putFile(uploadToken, key, localFile, putExtra, function(respErr,
//                                                                          respBody, respInfo) {
//         if (respErr) {
//             throw respErr;
//         }
//         if (respInfo.statusCode == 200) {
//             console.log(respBody);
//         } else {
//             console.log(respInfo.statusCode);
//             console.log(respBody);
//         }
//     });
// };