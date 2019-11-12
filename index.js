var express = require('express');
const app = express();

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

app.listen(process.env.PORT || 3000, function(){
    console.log('Your node js server is running');
});

// curl --location --request POST "http://localhost:3000/index/getUsers" --data "" ;
