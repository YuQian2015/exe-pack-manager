const jwt = require('jsonwebtoken');

const { config } = require('./config.js');
const { MONGO_DB, EXPORT_ROOT } = config;
const casbin = require('casbin');
const path = require('path');
// https://github.com/elasticio/casbin-mongoose-adapter
const MongooseAdapter = require('@elastic.io/casbin-mongoose-adapter');

// load the casbin model and policy from files, database is also supported.
const model = path.join(__dirname, 'config/keymatch_model.conf');
const policy = path.join(__dirname, 'config/keymatch_policy.csv');

class AppBootHook {
    constructor(app) {
        this.app = app;
    }

    async configWillLoad() {
        // 此时 config 文件已经被读取并合并，但是还并未生效
        // 这是应用层修改配置的最后时机
        // 注意：此函数只支持同步调用

        // 例如：参数中的密码是加密的，在此处进行解密
        // this.app.config.mysql.password = decrypt(this.app.config.mysql.password);
        // 例如：插入一个中间件到框架的 coreMiddleware 之间
        // const statusIdx = app.config.coreMiddleware.indexOf('status');
        // app.config.coreMiddleware.splice(statusIdx + 1, 0, 'limit');



        const adapter = await MongooseAdapter.newAdapter(`mongodb://${MONGO_DB.DB_USER}:${MONGO_DB.DB_PASSWORD}@${MONGO_DB.DB_IP}:${MONGO_DB.DB_PORT}/${MONGO_DB.DB_NAME}?authSource=${MONGO_DB.DB_NAME}`,
            {
                useNewUrlParser: true
            });
        this.app.config.authz.newEnforcer = async() => {
            // const enforcer = await casbin.newEnforcer(model, policy);
            const enforcer = await casbin.newEnforcer(model, adapter);
            this.app.enforcer = enforcer; // 将enforcer挂到app

            // console.log(await enforcer.addPolicy('admin', '/pack/list', '(GET)|(POST)'));
            // console.log(await enforcer.addPolicy('admin', '/pack', '(GET)|(POST)'));
            // console.log(await enforcer.addPolicy('admin', '/file', '(GET)|(POST)'));
            // console.log(await enforcer.addPolicy('admin', '/ui', '(GET)|(POST)'));
            // console.log(await enforcer.addPolicy('admin', '/home', '(GET)|(POST)'));
            // console.log(await enforcer.addPolicy('admin', '/tenant/*', '(GET)|(POST)|(PUT)|(DELETE)'));
            // console.log(await enforcer.addPolicy('admin', '/api/v1/**', '(GET)|(POST)|(PUT)|(DELETE)'));
            // console.log(await enforcer.addPolicy('admin', '/**', '(GET)|(POST)|(PUT)|(DELETE)'));
            // console.log(enforcer.getPolicy());
            return enforcer
        };
        this.app.jwt = jwt; // 将jsonwebtoken挂到app
    }

    async didLoad() {
        // 所有的配置已经加载完毕
        // 可以用来加载应用自定义的文件，启动自定义的服务

        // 例如：创建自定义应用的示例
        // this.app.queue = new Queue(this.app.config.queue);
        // await this.app.queue.init();

        // 例如：加载自定义的目录
        // app.loader.loadToContext(path.join(__dirname, 'app/tasks'), 'tasks', {
        //     fieldClass: 'tasksClasses',
        // });
    }

    async willReady() {
        // 所有的插件都已启动完毕，但是应用整体还未 ready
        // 可以做一些数据初始化等操作，这些操作成功才会启动应用

        // 例如：从数据库加载数据到内存缓存
        // this.app.cacheData = await app.model.query(QUERY_CACHE_SQL);
    }

    async didReady() {
        // 应用已经启动完毕

        // const ctx = await this.app.createAnonymousContext();
        // await ctx.service.Biz.request();
    }

    async serverDidReady() {
        // http / https server 已启动，开始接受外部请求
        // 此时可以从 app.server 拿到 server 的实例

        // app.server.on('timeout', socket => {
        //     // handle socket timeout
        // });
    }
}

module.exports = AppBootHook;