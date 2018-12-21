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
    
    // RESTful api
    router.resources('tenants', '/api/v1/tenants', controller.tenants); // 租户接口
    router.resources('files', '/api/v1/files', controller.files); // 文件接口

    router.get('/pack/setting', controller.pack.findTenant);
};