const Controller = require('egg').Controller;

class PurviewController extends Controller{
    async getPurviewList(){
        this.ctx.body = await this.ctx.service.purviewSetting.purview.getPurviewList();
    }


    async routerTree(){
        this.ctx.body = await this.ctx.service.purviewSetting.purview.routerTree();
    }

    async addPurview(){
        const {body} = this.ctx.request;
        this.ctx.body = await this.ctx.service.purviewSetting.purview.addPurview(body);
    }
}

module.exports = PurviewController;