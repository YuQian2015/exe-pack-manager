
const Service = require('egg').Service;

class WxService extends Service {

    // 创建微信临时用户
    async createVisitor(code, userInfo = {}) {
        const ctx = this.ctx;
        const { appId, appSecret } = ctx.app.config.wx
        return new Promise(async (resolve, reject) => {
            // 通过code获取用户的openid
            const result = await ctx.curl(`https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`, {
                dataType: 'json',
                timeout: 5000,
                method: 'GET',
                contentType: "application/json",
                data: JSON.stringify({})
            });
            if (result.data.errcode === 41008) {
                reject(new Error('缺少 code'))
                return
            }
            if (result.data.errcode === 40029) {
                reject(new Error('code 无效'))
                return
            }
            if (result.data.errcode === 40163) {
                reject(new Error('code 已经被使用'))
                return
            }
            if (result.data.errcode === 45011) {
                reject(new Error('频率限制，每个用户每分钟100次'))
                return
            }
            if (result.data.errcode === -1) {
                reject(new Error('系统繁忙，请稍候再试'))
                return
            }
            // openid
            // session_key
            // 请求成功
            ctx.model.WxUser.findOne({ openId: result.data.openid }).lean().exec((err, doc) => {
                if (err) {
                    reject(err);
                } else {
                    if (doc) {
                        resolve({ ...doc, ...result.data });
                    } else {
                        ctx.model.WxUser({
                            openId: result.data.openid,
                            ...userInfo
                        }).save((error, data) => {
                            if (error) {
                                reject(error);
                                return
                            }
                            resolve({ _id: data._id, ...data, ...result.data })
                        });
                    }
                }
            });
        })
    }

    async loginWxUser(userInfo = {}) {
        const ctx = this.ctx;
        // `doc` is the document _after_ `update` was applied because of `new: true`
        return ctx.model.User.findOneAndUpdate({ _id: ctx.state.user.id }, { ...userInfo, userType: 1 }, { new: true });
    }

    async getAccessToken() {
        const ctx = this.ctx;
        const { appId, appSecret } = ctx.app.config.wx
        return new Promise(async (resolve, reject) => {
            const access_token = await ctx.app.redis.get('access_token') // 获取redis
            if (access_token && access_token.length > 2) {
                resolve(access_token)
                return
            }
            const result = await ctx.curl(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`, {
                dataType: 'json',
                timeout: 5000,
                method: 'GET',
                contentType: "application/json",
                data: JSON.stringify({})
            });
            if (result.data.errcode === 40001) {
                reject(new Error('AppSecret 错误或者 AppSecret 不属于这个小程序'))
                return
            }
            if (result.data.errcode === 40002) {
                reject(new Error('请确保 grant_type 字段值为 client_credential'))
                return
            }
            if (result.data.errcode === 40013) {
                reject(new Error('不合法的 AppID，请开发者检查 AppID 的正确性，避免异常字符，注意大小写'))
                return
            }
            if (result.data.errcode === -1) {
                reject(new Error('系统繁忙，请稍候再试'))
                return
            }
            await this.app.redis.set('access_token', result.data.access_token, 'EX', result.data.expires_in)
            resolve(result.data.access_token)
        })
    }
}

module.exports = WxService;
