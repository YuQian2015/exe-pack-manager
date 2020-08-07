exports.config = {
    // 服务
    SERVER: {
        PORT: 7001,// 服务启动的端口
        HOST_NAME: '127.0.0.1', // 服务启动的IP（本机）
    },
    // MongoDB数据库
    MONGO_DB: {
        DB_USER: '', // 用户
        DB_PASSWORD: '',  //数据库密码
        DB_IP: '', // IP
        DB_PORT: '', // 端口
        DB_NAME: '' // 数据库名称
    },
    // 七牛存储
    QINIU: {
        AK: '', // Access Key
        SK: '', // Secret Key
        ZONE: '', // Zone_z0 华东, Zone_z1 华北, Zone_z2 华南, Zone_na0 北美
        BUCKET: '',
        BASE_URL: '', // 用于拼接已上传文件的完整地址
    },
    // REDIS服务端缓存
    REDIS: {
        PASSWORD: '', // 密码
        IP: '', // IP
        PORT: 6379 // 端口（默认端口6379）
    },
    // jsonwebtoken配置，请自行修改
    JWT: {
        SECRET: 'egg-start', // token的密钥（默认egg-start）
        EXPIRES_IN: '8h' // token过期时间 (默认8h)
    }
}