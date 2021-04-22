const controller = require('egg').Controller;

class PurviewSettingController extends controller{
    async getAllRouter(){
        const {query} = this.ctx.request;
        this.ctx.body = await this.ctx.service.purviewSetting.index.getAllRouter(query);
    }

    async addRouter(){
        const {body} = this.ctx.request;
        if(body.parents&&!body.path){
            this.ctx.body={
                status:402,
                message:'存在父级页面必须需要path'
            }
            return
        }
        this.ctx.body = await this.ctx.service.purviewSetting.index.addRouter(body);
    }

    async editRouter(){
        const {body} = this.ctx.request;
        if(body.parents&&!body.path){
            this.ctx.body={
                status:402,
                message:'存在父级页面必须需要path'
            }
            return
        }
        this.ctx.body = await this.ctx.service.purviewSetting.index.editRouter(body);
    }
}

module.exports = PurviewSettingController