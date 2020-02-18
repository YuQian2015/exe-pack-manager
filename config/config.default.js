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
        url: 'mongodb://admin:exe123@123.56.190.203:3001/exePack?authSource=exePack',
        options: {},
    },
};

exports.security = {
    csrf: {
        enable: false,
    }
}
// exports.security = {
//     csrf: {
//         enable: false,
//         ignoreJSON: true
//     },
//     domainWhiteList: '*'
// };

exports.cors = {
    origin:'*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
};

exports.cluster = {
    listen: {
        port: 7001,
        hostname: '0.0.0.0',
        // path: '/var/run/egg.sock',
    }
}

// 加载 errorHandler 中间件
exports.middleware = ['errorHandler', 'jwtHandler', 'jwt', 'authz'];
// 只对 /api 前缀的 url 路径生效
exports.errorHandler = {
    // match: '/api',
};
// jwt配置
exports.jwt = {
    secret: 'exe-tools',
    expiresIn: "8h",
    ignore(ctx) {
        // todo 目前先排除正在自动化使用到的接口
        const reg = /\/api\/v1\/colors|\/autopack/g;
        // console.log(ctx.request.url);
        // console.log(reg.test(ctx.request.url));
        if(ctx.request.url === '/') {
            return true
        }
        if(reg.test(ctx.request.url)) {
            return true
        }
        return reg.test(ctx.request.url);
    },
    getToken: function fromHeaderOrQuerystring(ctx) {
        if (ctx.headers.authorization && ctx.headers.authorization.split(" ")[0] === "Bearer") {
            return ctx.headers.authorization.split(" ")[1];
        } else if (ctx.query && ctx.query.token) {
            return ctx.query.token;
        } else if (ctx.cookies.get('token')) {
            return ctx.cookies.get('token');
        } else {
            return null;
        }
    },
    unless: { path: ["/login","/api/v1/login", "/api/v1/teams", "/api/v1/rate", "/public/tenants"] }
};


exports.jwtHandler = {
    public: '/login',
};

exports.authz = {
    enable: true,
    ignore(ctx) {
        const reg = /\/login|\/public|\/api\/v1\/colors|\/teams|\/rate/g;
        // console.log(ctx.request.url);
        // console.log(reg.test(ctx.request.url));
        if(ctx.request.url === '/') {
            return true
        }
        if(reg.test(ctx.request.url)) {
            return true
        }
        return reg.test(ctx.request.url);
    }
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
        ak: 'uD1c_3eaMAsCh8gb7S-MFLgvnhx8FOjW-TeQdUMK', // Access Key
        sk: '4JO1iw16tKGR7q9IY4wDz76RBUh7KZJ40WmLZaxu', // Secret Key
        useCdnDomain: true,
        isLog: true,
    },
    app: true,
    agent: false,

    // 单实例
    // 通过 app.fullQiniu 直接使用实例
    client: {
        zone: 'Zone_z0', // Zone_z0 华东, Zone_z1 华北, Zone_z2 华南, Zone_na0 北美
        bucket: 'bucket-frontend',
        baseUrl: 'https://eftcdn.exexm.com/', // 用于拼接已上传文件的完整地址
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
