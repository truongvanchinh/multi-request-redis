const express = require('express')

const { get, set, setnx, incrby, exists } = require('./model.redis')

const app = express()

app.get('/order', async (req, res) => {
    const time = new Date().getTime()
    console.log(`Time request ::::${time}`);

    const slTonkho = 100

    const keyName = 'IPhone15'

    const slMua = 1 

    const getKey = await exists(keyName)
    
    if (!getKey) {
        await setnx(keyName, 0)
    }
    let slBan = await get(keyName)
    console.log("Số lượng trước khi bán ra::", slBan);
    slBan = await incrby(keyName, slMua)
    if (slBan > slTonkho) {
        console.log("Out of stock");
        return res.status(400).json({
            status: 'fail',
            msg: 'Out of stock'
        });
    }

    console.log("Sau khi order thanh cong thi so luong ban ra === ", slBan);
    if (slBan > slTonkho){
        await set('banquaroi', slBan-slTonkho)
    }
    

    return res.json({
        status: 'success',
        msg: 'OK',
        time
    })
})

app.listen(3000, () => {
    console.log("Server run port 3000");
})