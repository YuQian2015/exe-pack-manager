const casbin = require('casbin');
const path = require('path');
const MongooseAdapter = require('@elastic.io/casbin-mongoose-adapter');

// load the casbin model and policy from files, database is also supported.
const model = path.join(__dirname, 'keymatch_model.conf');
const policy = path.join(__dirname, 'keymatch_policy.csv');

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
exports.middleware = ['errorHandler', 'jwtHandler', 'jwt', 'role', 'authz', 'authzHandler'];
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
        const reg = /\/api\/v1\/colors/g;
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
    unless: { path: ["/login","/api/v1/login"] }
};


exports.jwtHandler = {
    public: '/login',
};

exports.authzHandler = {
    enable: true,
    // ignore(ctx) {
    //     const reg = /\/login|\/public|\/api\/v1\/colors/g;
    //     // console.log(ctx.request.url);
    //     // console.log(reg.test(ctx.request.url));
    //     if(ctx.request.url === '/') {
    //         return true
    //     }
    //     if(reg.test(ctx.request.url)) {
    //         return true
    //     }
    //     return reg.test(ctx.request.url);
    // }
};

exports.authz = {
    enable: true,
    ignore(ctx) {
        const reg = /\/login|\/public|\/api\/v1\/colors/g;
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
    newEnforcer: async() => {


        // const adapter = await MongooseAdapter.newAdapter('mongodb://admin:exe123@39.105.62.145:3001/exePack?authSource=exePack',
        //     {
        //         useNewUrlParser: true
        //     });

        const enforcer = await casbin.newEnforcer(model, policy);
        // const enforcer = await Enforcer.newEnforcer(model, adapter);
        // await adapter.addPermissionForUser('admin', '/pack/list', 'GET');
        // 源码参考 https://github.com/casbin/node-casbin/blob/master/test/enforcer.test.ts
        // 源码参考 https://github.com/elasticio/casbin-mongoose-adapter/blob/master/src/adapter.js
        // console.log(await enforcer.addPolicy('admin', '/pack/list', 'GET'));
        // console.log(await enforcer.addPolicy('admin', '/pack', 'GET'));
        // console.log(await enforcer.addPolicy('admin', '/file', 'GET'));
        // console.log(await enforcer.addPolicy('admin', '/ui', 'GET'));
        // console.log(await enforcer.addPolicy('admin', '/home', 'GET'));
        // console.log(await enforcer.addPolicy('admin', '/tenant/add', 'GET'));
        // console.log(await enforcer.addPolicy('admin', '/api/v1/packs?workWx=true', 'GET'));
        // console.log(enforcer.getPolicy());
        return enforcer
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
