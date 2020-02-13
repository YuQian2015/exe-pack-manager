const Service = require('egg').Service;
const fs = require('fs');
const path = require('path');
const FolderScanner = require('@moyufed/folder-scanner');

class CdnService extends Service {
    findCdn() {
        return this.ctx.model.Cdn.find();
    }
    createCdn(data) {
        return this.ctx.model.Cdn({ ...data }).save();
    }

    deleteCdn(id) {
        return this.ctx.model.Cdn.remove({ _id: id }).lean();
    }

    async publishCdn(id) {
        const cdn = await this.ctx.model.Cdn.findOne({
            _id: id
        });

        if (cdn) {
            const folder = ['app', 'app', 'wx', 'qywx', 'dd', 'embed', 'pc'];
            const type = cdn ? cdn.type : 5;
            const tenantId = cdn ? cdn.tenantId : 'unknown';
            const tenantMap = {
                "ctripvbk": "ctrip",
                "ctrip": "ctripadmin"
            }
            if(!fs.existsSync(path.join('fileTemp', folder[type], tenantMap[tenantId] || tenantId))) {
                throw new Error("没有需要发布的包");
            }
            const folderScanner = new FolderScanner({
                location: path.join('fileTemp', folder[type]),
                rootFolder: tenantMap[tenantId] || tenantId
            });
            const files = JSON.parse(folderScanner.getFiles().replace(',]', ']'))
            this.cdnIndex = 0;
            const oldVersion = await this.downloadHtml(cdn._id, cdn);
            const newVersion = await this.updateHtmlVersion(cdn);
            return await this.uploadFile(files, folder[type], tenantId, newVersion, cdn);
        }
    }

    async uploadFile(files, type, tenantId, version, cdn) {
        const ctx = this.ctx;
        const tenantMap = {
            "ctripvbk": "ctrip",
            "ctrip": "ctripadmin"
        }
        const id = tenantMap[tenantId] || tenantId
        const sourcePath = path.join('fileTemp', type, files[this.cdnIndex]);
        const destPath = cdn.resource.replace('{version}', version) + (files[this.cdnIndex]).replace(new RegExp('\/'+id+'\/', 'g'), '/');
        const res = await ctx.app.fullQiniu.uploadFile(destPath, sourcePath);
        this.cdnIndex++;
        console.log(this.cdnIndex + ':' + destPath);
        if (res.ok && files[this.cdnIndex]) {
            return await this.uploadFile(files, type, tenantId, version, cdn);
        }
        if (res.ok && this.cdnIndex === files.length) {
            const fileName = cdn.authPage.replace(/[\s\S]*\//g, '');
            const dest = cdn.authPage.replace(/https?:\/\/[\s\S]*.com\//g, '');
            console.log(dest);
            
            const res2 = await ctx.app.fullQiniu.uploadFile(dest, path.join('fileTemp', fileName));
            if(res2.ok) {
                return true
            }
            return false
        } else {
            return false
        }
    }

    async downloadHtml(id, cdn) {
        if (!cdn) {
            cdn = await this.ctx.model.Cdn.findOne({
                _id: id
            });
        }

        if (cdn) {
            const htmlPath = cdn.authPage + '?t=' + new Date().getTime();
            const result = await this.ctx.curl(htmlPath, {
                dataType: 'html',
            });
            const fileName = cdn.authPage.replace(/[\s\S]*\//g, '');
            const pathName = path.join('fileTemp', fileName);
            if (!fs.existsSync('fileTemp')) {
                fs.mkdirSync('fileTemp');
            }
            await this.writeFile(pathName, result.data);
            return await this._getVersion(pathName, id)
        }
    }

    writeFile(output, data) {
        return new Promise((resolve, reject) => {
            fs.writeFile(output, data, err => {
                if (err) {
                    reject(new Error('拉取CDN文件失败'));
                } else {
                    resolve(true);
                }
            })
        });
    }

    async _getVersion(filePath, id) {
        let content = fs.readFileSync(filePath, { encoding: "utf8" });
        const version = (/\/\d.\d.\d{1,}\//).exec(content)[0].replace(/\//g, '');
        await this.ctx.model.Cdn.findOneAndUpdate({
            _id: id
        }, {
                version
            });
        return version;
    }

    /**
     * 自动更新授权页中应用入口页版本
     *
     * 主版本号.子版本号[.修正版本号[.编译版本号]]
     * Major_Version_Number.Minor_Version_Number[.Revision_Number[.Build_Number]]
     *
     * @param {*} updateType 更新版本类型，主版本-0，子版本-1，修正版本-2
     */
    async updateHtmlVersion(cdn, updateType = 2) {
        const fileName = cdn.authPage.replace(/[\s\S]*\//g, '');
        const filePath = path.join('fileTemp', fileName)
        const rule = new RegExp(cdn.rule)
        let newVer;
        if (fs.existsSync(filePath)) {
            let content = fs.readFileSync(filePath, { encoding: "utf8" });
            content = content.replace(
                rule,
                function (match, withoutVerPart, majorVer, minorVer, revisionVer) {
                    newVer = [majorVer, minorVer, revisionVer]
                        .map((version, index) => {
                            return index === updateType
                                ? Number(version) + 1
                                : Number(version);
                        })
                        .join(".");
                    return withoutVerPart + newVer;
                }
            );
            await this.writeFile(filePath, content);
            return newVer;
        }
    }
}

module.exports = CdnService;
