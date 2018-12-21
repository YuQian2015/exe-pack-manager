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