const Controller = require('egg').Controller;

class UpdateController extends Controller {
    async updateTenant() {
        const tenantList = await this.ctx.service.tenant.findTenant();
        tenantList.forEach(async (t) => {
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
            if (!actualTenantId && !isCommon) {
                actualTenantId = tenantId;
            }
            if (isCommon) {
                actualTenantId = 'exe';
            }
            await this.ctx.service.tenant.updateOneTenant({ _id: tenant._id }, {
                isCommon, isCustomized, app, wx, workWx,
                dd, inlay, pc, actualTenantId, isLocked, valid
            });
        })
    }

    async updateTheme() {
        const tenantList = await this.ctx.service.tenant.findTenant();
        tenantList.forEach(async (t) => {
            const color = await this.ctx.service.color.findOneColor({ tenantId: t.tenantId === 'exe' ? 'common' : t.tenantId });
            let brand, primary, secondary;
            if (color && color.colors) {
                brand = color.colors['footer-color'];
                primary = color.colors['toolbar-color'] || color.colors['primary-color'];
                secondary = color.colors['primary-color'];
            }
            let { theme } = t;
            if (theme) {
                if (brand && primary && secondary) {
                    await this.ctx.service.theme.updateOneTheme({ _id: theme._id }, { brand, primary, secondary });
                }
            } else {
                if (brand && primary && secondary) {
                    const newTheme = await this.ctx.service.theme.createTheme({ brand, primary, secondary });
                    await this.ctx.service.tenant.updateOneTenant({ _id: t._id }, { theme: newTheme._id });
                }
            }
        })
    }

    async changeIcon() {
        // const tenantList = await this.ctx.service.tenant.findTenant();
        // tenantList.forEach( async (t)=> {
        //     await this.ctx.service.tenant.updateOneTenant({_id: t._id}, {icon: t.icon.replace('http://exe.moyufed.com/', 'https://eftcdn.exexm.com/exe-pack-manager/icons/')});
        //     console.log(t.icon);
        // })

        const iconList = await this.ctx.service.file.findFile({ page: 1, pageSize: 1000 });
        iconList.list.forEach(async (f) => {
            await this.ctx.service.file.updateOneFile({ _id: f._id }, { url: f.url.replace('http://exe.moyufed.com/', 'https://eftcdn.exexm.com/exe-pack-manager/icons/') });
            console.log(f.url);
        })
    }
}
module.exports = UpdateController;