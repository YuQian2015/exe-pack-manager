module.exports = app => {
    const {
        router,
        controller
    } = app;
    router.get('/', controller.tenant.findTenant);
    router.get('/home', controller.tenant.findTenant);
    router.get('/tenant', controller.tenant.findTenant);
    router.get('/tenant/add', controller.tenant.addTenant);
    router.get('/tenant/:id', controller.tenant.viewTenant);
    router.get('/tenant/:id/edit', controller.tenant.editTenant);
    router.post('/tenant/create', controller.tenant.createTenant);

    router.post('/upload', controller.upload.uploadImage);

    // 打包
    router.get('/pack', controller.pack.findTenant);
    router.get('/pack/list', controller.pack.findPack);

    // 文件
    router.get('/file', controller.file.findFile);
    
    // RESTful api
    router.resources('tenants', '/api/v1/tenants', controller.tenants); // 租户接口
    router.resources('files', '/api/v1/files', controller.files); // 文件接口
    router.resources('packs', '/api/v1/packs', controller.packs); // 打包接口
    router.resources('themes', '/api/v1/themes', controller.themes); // 主题接口
    router.resources('timelines', '/api/v1/timelines', controller.timelines); // 时间轴接口

};
