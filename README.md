
#### 使用的七牛插件 egg-full-qiniu
http://npm.taobao.org/package/egg-full-qiniu

需要配置插件

```js
exports.fullQiniu = {
    default: {
        ak: '', // Access Key
        sk: '', // Secret Key
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
```

使用代码示例：
```js
async uploadImage() {
        const ctx = this.ctx;
        //egg-multipart 已经帮我们处理文件二进制对象
        // node.js 和 php 的上传唯一的不同就是 ，php 是转移一个 临时文件
        // node.js 和 其他语言（java c#） 一样操作文件流
        let result;
        const stream = await ctx.getFileStream();
        const name = stream.filename;
        try {
            // 图片上传七牛
            result = await ctx.app.fullQiniu.uploadStream(name, stream);
            if(result.ok) {
                const newFile = await this.ctx.service.file.createFile({
                    fileName: stream.filename, // 文件名
                    type: stream.mimeType, // 文件类型
                    url:  result.url, // 文件url地址
                });
                ctx.body = {
                    code: 200,
                    data: newFile,
                    success: true,
                    msg: `上传成功`
                }
            }
            console.log(result);
        } catch (err) {
            throw err;
        }
    }
```

#### 使用jwt插件

安装
```shell
npm i egg-jwt --save
```

使用
```js
// {app_root}/config/plugin.js
exports.jwt = {
  enable: true,
  package: "egg-jwt"
};
```

配置
```js
// {app_root}/config/config.default.js
exports.jwt = {
  secret: "123456"
};
```

示例
```js
// app/router.js
"use strict";

module.exports = app => {
  app.get("/", app.jwt, "render.index"); // use old api app.jwt
  app.get("/login", "login.index");
  app.get("/success", "success.index"); // is setting in config.jwt.match
};

// app/controller/render.js
("use strict");

module.exports = app => {
  class RenderController extends app.Controller {
    *index() {
      this.ctx.body = "hello World";
    }
  }
  return RenderController;
};

// app/controller/login.js
("use strict");

module.exports = app => {
  class LoginController extends app.Controller {
    *index() {
      this.ctx.body = "hello admin";
    }
  }
  return LoginController;
};

// app/controller/success.js
("use strict");

module.exports = app => {
  class SuccessController extends app.Controller {
    *index() {
      this.ctx.body = this.ctx.state.user;
    }
  }
  return SuccessController;
};
```

如何创建token
```js
const token = app.jwt.sign({ foo: 'bar' }, app.config.jwt.secret);
```