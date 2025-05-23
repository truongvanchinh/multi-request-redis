'use strict'
const redis = require('redis')

const client = redis.createClient()
client.connect()

const get = async (key) => {
    return await client.get(key)
}

const set = async (key, count) => {
    return await client.set(key, Buffer.from(String(count)))
}

const incrby = async (key, count) => {
    return await client.incrBy(key, count);
}

const decrby = async (key, count) => {
    return await client.decrBy(key, count)
}

const exists = async (key) => {
    return await client.exists(key)
}

const setnx = async (key, count) => {
    return await client.setNX(key, Buffer.from(String(count)))
}


module.exports = {
    get,
    set,
    incrby,
    exists,
    setnx,
    decrby
}