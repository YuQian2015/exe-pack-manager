module.exports = app => {
    const {
        router,
        controller
    } = app;

    router.get('/', controller.tenant.findTenant);
    router.get('/login', controller.home.login);
    router.get('/home', controller.tenant.findTenant);
    router.get('/tenant', controller.tenant.findTenant);
    router.get('/tenant/add', controller.tenant.addTenant);
    router.get('/tenant/:id', controller.tenant.viewTenant);
    router.get('/tenant/:id/edit', controller.tenant.editTenant);
    router.post('/tenant/create', controller.tenant.createTenant);

    router.post('/image/upload', controller.upload.uploadImage);
    router.post('/package/upload', controller.upload.uploadPackage);
    router.post('/excel/upload/hiring', controller.upload.uploadHiring);
    router.del('/image/delete/:id', controller.upload.deleteImage);

    // 打包
    router.get('/pack', controller.pack.findTenant);
    router.get('/pack/list', controller.pack.findPack);
    router.get('/pack/history', controller.pack.findHistory);

    // ui
    router.get('/ui', controller.ui.findUi);

    // 文件
    router.get('/file', controller.file.findFile);

    // 内嵌版
    router.get('/inlay', controller.inlay.findInlay);

    // CDN
    router.get('/cdn', controller.cdn.findCDN);
    router.get('/api/v1/cdn/:id/version', controller.cdn.getVersion);
    router.post('/api/v1/cdn/:id/publish', controller.cdn.publishCdn);

    // 管理
    router.get('/management', controller.management.findManagement);

    // 原生
    router.get('/native', controller.native.findNative);

    // 升级数据库所使用
    router.post('/update/tenant', controller.update.updateTenant);
    router.post('/update/theme', controller.update.updateTheme);
    router.post('/update/icon', controller.update.changeIcon);

    // api
    router.post('/public/logout', controller.login.logout);
    router.get('/public/tenants', controller.tenants.index);
    router.get('/pack/tenants', controller.pack.findPackTenant);

    
    router.post('/api/v1/hiring/search', controller.hiring.search); // 招聘搜索


    // RESTful api
    router.resources('users', '/api/v1/users', controller.users); // 用户接口
    router.resources('login', '/api/v1/login', controller.login); // 登录接口
    router.resources('tenants', '/api/v1/tenants', controller.tenants); // 租户接口
    router.resources('files', '/api/v1/files', controller.files); // 文件接口
    router.resources('packs', '/api/v1/packs', controller.packs); // 打包接口
    router.resources('themes', '/api/v1/themes', controller.themes); // 主题接口
    router.resources('timelines', '/api/v1/timelines', controller.timelines); // 时间轴接口
    router.resources('colors', '/api/v1/colors', controller.colors); // 颜色
    router.resources('autopacks', '/api/v1/autopacks', controller.autopacks); // 自动打包
    router.resources('roles', '/api/v1/roles', controller.roles); // 角色
    router.resources('policies', '/api/v1/policies', controller.policies); // 策略
    router.resources('keepers', '/api/v1/keepers', controller.keepers); // 保管
    router.resources('features', '/api/v1/features', controller.features); // 对接特性
    router.resources('inlays', '/api/v1/inlays', controller.inlays); // 内嵌版
    router.resources('cdn', '/api/v1/cdn', controller.cdn); // cdn
    router.resources('teams', '/api/v1/teams', controller.teams);
    router.resources('rate', '/api/v1/rate', controller.rate);
    router.resources('hiring', '/api/v1/hiring', controller.hiring); // 招聘
};
