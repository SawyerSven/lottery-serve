const Controller = require('egg').Controller;

class indexController extends Controller {
    async getInfo() {
        const {ctx,service} = this;
        const data = await this.app.mysql.query('select * from lottery where num > 0 order by id ASC');
        if(data && data.length){
            let res = Math.floor(Math.floor(Math.random()*data.length+0))
            ctx.body = service.lottery.mixinResponseData({res,list:data},200,'success');
        }else{
            ctx.body = service.lottery.mixinResponseData([],10500,'奖品已抽完,感谢您的参与')
        }
    }
    async getAwardItem(){
        const {ctx,service} = this;
        const data = await this.app.mysql.query('select * from lottery where num > 0 order by id ASC');
        if(data && data.length){
            let res = Math.floor(Math.floor(Math.random()*data.length+0))
            let id = data[res].id;
            console.log(id);
            // ctx.body = service.lottery.mixinResponseData({res,list:data},200,'success');
            const item = await this.app.mysql.get('lottery',{id:data[res].id})
            ctx.body = service.lottery.mixinResponseData(item,200,'success');
        }else{
            ctx.body = service.lottery.mixinResponseData([],10500,'奖品已抽完,感谢您的参与')
        }
    }
}

module.exports = indexController