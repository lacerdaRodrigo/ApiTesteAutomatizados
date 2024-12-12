const { MongoClient } = require('mongodb')

const mongoUri = 'mongodb+srv://lacerdaarodrigo:HH6yYxrdy1yLl6CA@api.hsggv.mongodb.net/?retryWrites=true&w=majority&appName=Api'

const client = new MongoClient(mongoUri)

async function connect() {

    await client.connect()

    return client.db('test')
}

async function disconnect() {
    await client.disconnect()
}

module.exports = { connect, disconnect }