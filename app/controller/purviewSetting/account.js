const Controller = require('egg').Controller;

class AccountController extends Controller{
    async accountList(){
        this.ctx.body = await this.ctx.service.purviewSetting.account.accountList();
    }

    async addAccount(){
        const body = this.ctx.request.body;
        this.ctx.body = await this.ctx.service.purviewSetting.account.addAccount(body);
    }
}

module.exports = AccountController