const Controller = require('egg').Controller;

class PurviewController extends Controller{
    async getPurviewList(){
        this.ctx.body = await this.ctx.service.purviewSetting.purview.getPurviewList();
    }
}

module.exports = PurviewController;