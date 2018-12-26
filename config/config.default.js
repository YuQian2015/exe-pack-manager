exports.keys = 'exe-tools'; // Cookie 安全字符串>;

// 添加 view 配置
exports.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
        '.tpl': 'nunjucks',
    },
};

// recommended
exports.mongoose = {
    client: {
        url: 'mongodb://admin:exe123@39.105.62.145:3001/exePack?authSource=exePack',
        options: {},
    },
};

exports.security = {
    csrf: {
        enable: false,
    }
}

exports.cluster = {
    listen: {
        port: 7001,
        hostname: '0.0.0.0',
        // path: '/var/run/egg.sock',
    }
}

// 加载 errorHandler 中间件
exports.middleware = ['errorHandler'];
// 只对 /api 前缀的 url 路径生效
exports.errorHandler = {
    match: '/api',
};
// module.exports = {
//     // 加载 errorHandler 中间件
//     middleware: ['errorHandler'],
//     // 只对 /api 前缀的 url 路径生效
//     errorHandler: {
//         match: '/api',
//     },
// };

// exports.multipart = {
//     mode: 'file',
// };



exports.fullQiniu = {
    default: {
        ak: 'Y3Yp083X9R5vnYca10N8DkpNq4q1zoxrtNip1Ptf', // Access Key
        sk: '1yVv5hqxplLYoVTwBAJwjV2GWwTSHNDEYu1AE0Iw', // Secret Key
        useCdnDomain: true,
        isLog: true,
    },
    app: true,
    agent: false,

    // 单实例
    // 通过 app.fullQiniu 直接使用实例
    client: {
        zone: 'Zone_z0', // Zone_z0 华东, Zone_z1 华北, Zone_z2 华南, Zone_na0 北美
        bucket: 'exe-res',
        baseUrl: 'http://exe.moyufed.com/', // 用于拼接已上传文件的完整地址
    }

    // 多实例
    // clients: {
    //     // 可以通过 app.fullQiniu.get('myImage'), app.fullQiniu.get('myText') 获取实例
    //     myImage: {
    //         zone: '', // Zone_z0 华东, Zone_z1 华北, Zone_z2 华南, Zone_na0 北美
    //         bucket: '',
    //     baseUrl: null, // 用于拼接已上传文件的完整地址
    //     },
    //     myText: {
    //         zone: '', // Zone_z0 华东, Zone_z1 华北, Zone_z2 华南, Zone_na0 北美
    //         bucket: '',
    //     baseUrl: null, // 用于拼接已上传文件的完整地址
    //     },
    // },
};