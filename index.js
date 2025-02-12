const http = require('http')
const url = require('url')
const querystring = require('querystring')
const { add, sub } = require('./calculator')

http.createServer(

    function (req, res) {

        const reqURL = req.url
        // console.log(reqURL);
        const urlParse = url.parse(reqURL)
        // console.log(urlParse.query);
        const querystringParse = querystring.parse(urlParse.query)
        console.log(querystringParse);

        const num1 = querystringParse.num1
        const num2 = querystringParse.num2

        if (reqURL.includes('/add')) {
            res.write(add(num1, num2));
        } else if (reqURL.includes('/sub')) {
            res.write(sub(num1, num2))
        }

        res.end();
    }

).listen(8080)