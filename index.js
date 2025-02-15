// const http = require('http')
// const url = require('url')
// const querystring = require('querystring')
// const { add, sub } = require('./calculator')

// http.createServer(

//     function (req, res) {

//         const reqURL = req.url
//         // console.log(reqURL);
//         const urlParse = url.parse(reqURL)
//         // console.log(urlParse.query);
//         const querystringParse = querystring.parse(urlParse.query)
//         console.log(querystringParse);

//         const num1 = querystringParse.num1
//         const num2 = querystringParse.num2

//         if (reqURL.includes('/add')) {
//             res.write(add(num1, num2));
//         } else if (reqURL.includes('/sub')) {
//             res.write(sub(num1, num2))
//         }
//         res.end();
//     }

// ).listen(8080)

const express = require('express')
const { MongoClient, ObjectId } = require('mongodb');
const calcu = require('./calculator')
const app = express();

app.use(express.json());

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);


async function getData() {
    await client.connect();
    const db = client.db('9_to_11');
    const collection = db.collection('user');
    const data = await collection.find({}).toArray()
    // console.log(data);
    return data
}

async function insertData(data) {
    await client.connect();
    const db = client.db('9_to_11');
    const collection = db.collection('user');
    const insertdata = await collection.insertOne(data)
    // console.log(insertdata);
    return insertdata
}

async function updateData(id, data) {
    await client.connect();
    const db = client.db('9_to_11');
    const collection = db.collection('user');
    const updatedata = await collection.updateOne({ _id: new ObjectId(id) }, { $set: data })
    console.log(updatedata);
    // return insertdata
}

async function deleteData(id) {
    await client.connect();
    const db = client.db('9_to_11');
    const collection = db.collection('user');
    const deletedata = await collection.deleteOne({ _id: new ObjectId(id) })
    console.log(deletedata);
    // return insertdata
}

app.get('/getData', async (req, res) => {
    const data = await getData()
    res.send(data)
})

app.post('/insertData', async (req, res) => {
    const data = await insertData(req.body);
    res.send(data)
})

app.put('/updateData/:id', async (req, res) => {
    const data = await updateData(req.params.id, req.body);
    res.send(data)
});

app.delete('/deleteData/:id', async (req, res) => {
    const data = await deleteData(req.params.id)
    res.send(data)
})

// app.get('/add/:num1/:num2', (req, res) => {
//     // const data = calcu.add(req.query.num1, req.query.num2)
//     const data = calcu.add(req.params.num1, req.params.num2)
//     res.send(data)
// })

// app.get('/sub/:num1/:num2', (req, res) => {
//     // const data = calcu.sub(req.query.num1, req.query.num2)
//     const data = calcu.sub(req.params.num1, req.params.num2)
//     res.send(data)
// })

app.listen(8000)