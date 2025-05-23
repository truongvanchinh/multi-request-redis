const express = require('express')

const { get, set, setnx, incrby, exists } = require('./model.redis')

const app = express()

app.get('/order', async (req, res) => {
    const time = new Date().getTime()
    console.log(`Time request ::::${time}`);

    const slTonkho = 100

    const keyName = 'IPhone15'

    const slMua = 1 

    try {
        const getKey = await exists(keyName)
        
        if (!getKey) {
            await set(keyName, 0)
        }
        let slBan = await get(keyName)
        console.log("Số lượng trước khi bán ra::", slBan);

        if (slBan+slMua > slTonkho) {
            console.log("Out of stock");
            return res.status(400).json({
                status: 'fail',
                msg: 'Out of stock'
            });
        }

        slBan = await incrby(keyName, slMua)
        console.log("Số lượng sau khi bán ra::", slBan);

        return res.json({
            status: 'success',
            msg: 'OK',
            time
        })
    } catch (err) {
        console.error("Lỗi Redis:", err);
        return res.status(500).json({ status: "error", msg: err.message });
    }
})

app.listen(3000, () => {
    console.log("Server run port 3000");
})