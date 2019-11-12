var express = require('express');
const app = express();
const http = require('http');

app.get("/index/hello", (req, res) => {
    res.send("Hello world");
});

app.post("/index/getUsers", async function (req, res) {
    const sqlQuery = 'SELECT *  FROM `user`';
    res.send(sqlQuery);
});

app.use(async function (req, res, next) {
    res.status(404).send({ error: "Sorry, that route doesn't exist. Have a nice day :)" });
});

const server = http.createServer(app);
server.listen(3000);
server.on('error', (e) => {
    // fs.writeFile('./out.log', JSON.stringify(e), 'utf-8');
});

// curl --location --request POST "http://localhost:3000/index/getUsers" --data "" ;
