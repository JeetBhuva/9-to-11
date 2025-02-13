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
const calcu = require('./calculator')
const app = express();

app.get('/add/:num1/:num2', (req, res) => {
    // const data = calcu.add(req.query.num1, req.query.num2)
    const data = calcu.add(req.params.num1, req.params.num2)
    res.send(data)
})
app.get('/sub/:num1/:num2', (req, res) => {
    // const data = calcu.sub(req.query.num1, req.query.num2)
    const data = calcu.sub(req.params.num1, req.params.num2)
    res.send(data)
})
app.listen(8000)