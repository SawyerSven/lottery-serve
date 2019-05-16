const Controller = require('egg').Controller;
const sendToWormhole  = require('stream-wormhole');
const awaitWriteStream = require('await-stream-ready').write;
const path = require('path');
const fs = require('fs')

class indexController extends Controller {
    async index(){
        const {ctx,service} = this;
        const result =await this.app.mysql.select('lottery');
        // ctx.body = service.lottery.mixinResponseData(result,200,'success');
        await ctx.render('index',{
            data:result
        })
    }
    async create(){
        const {ctx,app,service} = this;

        const stream = await ctx.getFileStream();
        const uplaodBasePath = 'app/public/upload/';
        //新建一个文件名
        const filename = Date.now() + '' + Number.parseInt(Math.random() * 10000) + path.extname(stream.filename);
        if (!fs.existsSync(uplaodBasePath)) fs.mkdirSync(path.join(this.config.baseDir, uplaodBasePath));
        // 生成写入路径 
        const target = path.join(this.config.baseDir, uplaodBasePath, filename);
        // 写入流
        const writeStream = fs.createWriteStream(target);
        try {
            // 写入文件
            await awaitWriteStream(stream.pipe(writeStream));
        } catch (err) {
            // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
            await sendToWormhole(stream);
            throw err;
        }

        let data = stream.fields;
        if(!data.text){service.lottery.mixinResponseData('',100500,'请输入奖品名称')}
        if(!data.num){service.lottery.mixinResponseData('',100500,'请输入奖品数量')}        
        const result = await app.mysql.insert('lottery',{...data,created_at:this.app.mysql.literals.now,updated_at:this.app.mysql.literals.now,img:'/public/upload/'+filename});
        if(result.affectedRows === 1){
            ctx.redirect('/lottery')
        }
    }
    async show(){
        const{ctx,service} = this;
        let id = ctx.params.id;
        const result = await this.app.mysql.get('lottery',{id})
        if(result){
            ctx.body = service.lottery.mixinResponseData(result,200,'success')
        }else{
            ctx.body = service.lottery.mixinResponseData('',10404,'not found')
        }
    }
    async update(){
        const {ctx,app,service} = this;

        const stream = await ctx.getFileStream();
        const uplaodBasePath = 'app/public/upload/';
        //新建一个文件名
        const filename = Date.now() + '' + Number.parseInt(Math.random() * 10000) + path.extname(stream.filename);
        if (!fs.existsSync(uplaodBasePath)) fs.mkdirSync(path.join(this.config.baseDir, uplaodBasePath));
        // 生成写入路径 
        const target = path.join(this.config.baseDir, uplaodBasePath, filename);
        // 写入流
        const writeStream = fs.createWriteStream(target);
        try {
            // 写入文件
            await awaitWriteStream(stream.pipe(writeStream));
        } catch (err) {
            // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
            await sendToWormhole(stream);
            throw err;
        }
        let info = stream.fields;
        if(!info.text){service.lottery.mixinResponseData('',100500,'请输入奖品名称')}
        if(!info.num){service.lottery.mixinResponseData('',100500,'请输入奖品数量')}   
        let data = {id:Number(ctx.params.id),...info,updated_at:this.app.mysql.literals.now,img:'/public/upload/'+filename}
        const result = await this.app.mysql.update('lottery',data)
        if(result.affectedRows === 1){
            // ctx.body = service.lottery.mixinResponseData("",200,'success')
            ctx.redirect('/lottery')
        }else{
            ctx.body = service.lottery.mixinResponseData('',10404,'fail')
        }
    }
    async destroy(){
        const {ctx,service} = this;
        let id = ctx.params.id;
        const result = await this.app.mysql.delete('lottery',{id})
        if(result.affectedRows === 1){
            // ctx.body = service.lottery.mixinResponseData("",200,'删除成功')
            ctx.redirect('/lottery')
        }else{
            ctx.body = service.lottery.mixinResponseData('',10404,'删除失败')
        }
    }
}

module.exports = indexController