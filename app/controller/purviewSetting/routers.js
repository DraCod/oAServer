const controller = require('egg').Controller;

class PurviewSettingController extends controller{
    //获取所有的页面路由
    async getAllRouter(){
        const {query} = this.ctx.request;
        this.ctx.body = await this.ctx.service.purviewSetting.routers.getAllRouter(query);
    }

    //添加路由
    async addRouter(){
        const {body} = this.ctx.request;
        if(body.parents&&!body.path){
            this.ctx.body={
                status:402,
                message:'存在父级页面必须需要path'
            }
            return
        }
        this.ctx.body = await this.ctx.service.purviewSetting.routers.addRouter(body);
    }

    //修改路由
    async editRouter(){
        const {body} = this.ctx.request;
        if(body.parents&&!body.path){
            this.ctx.body={
                status:402,
                message:'存在父级页面必须需要path'
            }
            return
        }
        this.ctx.body = await this.ctx.service.purviewSetting.routers.editRouter(body);
    }

    //删除路由
    async deleteRouter(){
        this.ctx.body = await this.ctx.service.purviewSetting.routers.deleteRouter(this.ctx.params)
    }

}

module.exports = PurviewSettingController