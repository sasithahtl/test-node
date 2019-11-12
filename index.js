var express = require('express');
const app = express();
var pool = require('./database');
const http = require('http');
const fs = require('fs');

app.get("/index/hello", (req, res) => {
    res.send("Hello world");
});

app.post("/index/getUsers", async function (req, response) {
    const sqlQuery = 'SELECT *  FROM `user`';
    pool.query(sqlQuery, function (err, result) {
        if (err) { response.status(500).send(err); }
        const stringifyResult = JSON.stringify(result);
        let parsedResult = JSON.parse(stringifyResult);
        response.send(parsedResult);
    });
});

const sqlQuery = 'SELECT *  FROM `user`';
app.route('/index/getUsers')
    .get(
        pool.query(sqlQuery, function (err, result) {
            if (err) { response.status(500).send(err); }
            const stringifyResult = JSON.stringify(result);
            let parsedResult = JSON.parse(stringifyResult);
            response.send(parsedResult);
        })
    );

// app.listen(3000, () =>
//     console.log('Example app listening on port 3000!'),
// );

app.use(async function (req, res, next) {
    res.status(404).send({ error: "Sorry, that route doesn't exist. Have a nice day :)" });
});

const server = http.createServer(app);
server.listen(3000);
server.on('error', (e) => {
    fs.writeFile('./out.log', JSON.stringify(e), 'utf-8');
});

// curl --location --request POST "http://localhost:3000/index/getUsers" --data "" ;
