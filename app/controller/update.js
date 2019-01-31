const Controller = require('egg').Controller;

class UpdateController extends Controller {
    async updateTenant() {
        const tenantList = await this.ctx.service.tenant.findTenant();
        tenantList.forEach( async (t)=> {
            let tenant = t;
            let { tenantId, actualTenantId, appName, tenantName, province, icon, address, isCommon, isCustomized, app, wx, workWx,
                dd, inlay, pc, description, theme, isLocked, valid } = tenant;
            isCommon = !!isCommon;
            isCustomized = !!isCustomized;
            app = !!app;
            wx = !!wx;
            workWx = !!workWx;
            dd = !!dd;
            inlay = !!inlay;
            pc = !!pc;
            valid = !!valid;
            isLocked = !!isLocked;
            if(!actualTenantId && !isCommon) {
                actualTenantId = tenantId;
            }
            if(isCommon) {
                actualTenantId = 'exe';
            }
            await this.ctx.service.tenant.updateOneTenant({_id:tenant._id}, {isCommon, isCustomized, app, wx, workWx,
                dd, inlay, pc, actualTenantId, isLocked, valid});
        })
    }
}
module.exports = UpdateController;