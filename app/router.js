module.exports = app => {
    const {
        router,
        controller
    } = app;

    router.get('/', app.jwt, controller.tenant.findTenant);
    router.get('/login', controller.home.login);
    router.get('/home', app.jwt, controller.tenant.findTenant);
    router.get('/tenant', app.jwt, controller.tenant.findTenant);
    router.get('/tenant/add', app.jwt, controller.tenant.addTenant);
    router.get('/tenant/:id', app.jwt, controller.tenant.viewTenant);
    router.get('/tenant/:id/edit', app.jwt, controller.tenant.editTenant);
    router.post('/tenant/create', app.jwt, controller.tenant.createTenant);

    router.post('/upload', app.jwt, controller.upload.uploadImage);

    // 打包
    router.get('/pack', app.jwt, controller.pack.findTenant);
    router.get('/pack/list', app.jwt, controller.pack.findPack);

    // ui
    router.get('/ui', app.jwt, controller.ui.findUi);

    // 文件
    router.get('/file', app.jwt, controller.file.findFile);
    
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

};
