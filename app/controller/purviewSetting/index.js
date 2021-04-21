const controller = require('egg').Controller;

class PurviewSettingController extends controller{
    async getAllRouter(){
        this.ctx.body = await this.ctx.service.purviewSetting.index.getAllRouter();
    }
}

module.exports = PurviewSettingController