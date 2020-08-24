const Service = require('egg').Service;

class LoginService extends Service {

    /**
     * 检查前端扫码结果
     *
     * @param {*} data 用户信息
     * @returns
     * @memberof LoginService
     */
    async _checkExeUser(data) {
        const ctx = this.ctx;
        const { qrApplyId, ticket } = data;
        const result = await ctx.curl(`https://sso.exexm.com/qrlogin.ashx?t=listen&v=2&qrApplyId=${qrApplyId}&ticket=${ticket}`, {
            dataType: 'json',
            timeout: 5000,
            method: 'POST',
            headers: {
                "Accept-Language": 'zh-CN',
            },
            contentType: "application/json",
            data: JSON.stringify({ qrApplyId, version: 2 })
        });

        if (result.data.code === 200) {
            return result.data
        }
        return false

    }

    /**
     * 如果没有用户则创建用户
     *
     * @param {*} result 用户登录结果
     * @returns
     * @memberof LoginService
     */
    async _createIfNotExist(result) {
        const ctx = this.ctx;
        const user = await ctx.service.user.findOneUser({ userId: result.userCode });
        if (user) {
            console.log('系统存在用户');
            console.log(user)
            const token = ctx.app.jwt.sign({ id: user._id, role: user.role ? user.role.name : 'visitor' }, ctx.app.config.jwt.secret, {
                expiresIn: ctx.app.config.jwt.expiresIn
            });
            return { user, token };
        }
        console.log('系统不存在用户');
        const newUser = await ctx.service.user.createUser({
            name: result.name, // 姓名
            userId: result.userCode, // 用户Id
            tenantId: result.tenantId, // 租户ID
            password: 'e10adc3949ba59abbe56e057f20f883e', // 用户密码
        });
        const token = ctx.app.jwt.sign({ id: newUser._id, role: 'visitor' }, ctx.app.config.jwt.secret, {
            expiresIn: ctx.app.config.jwt.expiresIn
        });
        return { user: newUser, token };
    }

    /**
     * 前端使用EXE二维码扫码结果登录
     *
     * @param {*} data 登录成功返回数据
     * @returns
     * @memberof LoginService
     */
    async loginWithExeQrCode(data) {
        const ctx = this.ctx;
        try {
            const result = await this._checkExeUser(data);
            if (result) {
                console.log(result.ticket)
                console.log(data.ticket)
                console.log('-------------');
                if (result.ticket && result.ticket
                    .replace(/%2f/g, "/")
                    .replace(/%3f/g, "?")
                    .replace(/%2b/g, "+")
                    .replace(/%3d/g, "=")
                    .replace(/%26/g, "&") === data.ticket) {
                    console.log('用户扫码验证成功');
                    return this._createIfNotExist(result);
                } else {
                    throw new Error('扫码验证失败');
                }
            } else {
                throw new Error('扫码验证失败');
            }
        }
        catch (err) {
            throw err;
        }
    }

}

module.exports = LoginService;
