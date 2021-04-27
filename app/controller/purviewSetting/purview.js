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

    async purviewDetail(){
        const params = this.ctx.params
        this.ctx.body = await this.ctx.service.purviewSetting.purview.purviewDetail(params);
    }

    async editPurview(){
        const body = this.ctx.request.body;
        this.ctx.body = await this.ctx.service.purviewSetting.purview.editPurview(body);
    }

    async deletePurview(){
        const params = this.ctx.params
        this.ctx.body = await this.ctx.service.purviewSetting.purview.deletePurview(params);
    }
}

module.exports = PurviewController;