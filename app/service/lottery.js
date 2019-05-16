const Service = require('egg').Service;

class lotteryService extends Service {

    async readDataBase(tName,params,orderObj = {key:'index',order:'asc'},limit = 10,offset=0) {
        let query = this.deleteEmptyProperty(params);
        if(query){
            const res = await this.app.mysql.select(tName,{
                where:{...query},
                orders:[[orderObj.key,orderObj.order]],
                limit:limit,
                offset:offset
            })
            return res
        }else{
            const res = await this.app.mysql.select(tName,{
                orders:[[orderObj.key,orderObj.order]],
                limit:limit,
                offset:offset
            })
            return res
        }
    }

    deleteEmptyProperty(data){
        for(let p in data){
            if(!data[p] || data[p] === '' || data[p] === undefined){
                delete data[p]
            }
        }
        return data
    }

    mixinResponseData(data, code, message) {
        return {
            code,
            message,
            data
        }
    }
    transferLotteryResult() {
        let arr = [];
        for (let i = 0; i < Math.floor(Math.random() * (12 - 2) + 1); i++) {
            arr.push({
                serial: Math.floor(Date.now() / 1000),
                time: '2019-08-12',
                content: {
                    awards: ['1st','2nd','3rd','4th'],
                    result: this.randomResult()
                }
            })
        }
        return arr;
    }
    randomResult() {
        let arr = [];
        for (let i = 0; i < Math.floor(Math.random() * (8 - 1) + 1); i++) {
            arr.push(Math.floor(Math.random() * (32 - 1) + 1))
        }
        if (arr.length > 1) {
            return arr;
        }
        return arr[0];
    }

}

module.exports = lotteryService