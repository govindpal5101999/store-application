const mongoose = require('mongoose');

const dotenv = require('dotenv');

const express = require('express');

const app = express();

dotenv.config({ path: './config.env'})

require('./db/conn');

const PORT = process.env.PORT

app.use(express.json());

const path = require("path");

app.use("/images", express.static(path.join(__dirname, "./uploads")))

app.use(require('./router/app')); 

app.get('/', (req, res) =>{
    res.send('hello from server')
})

app.listen(PORT, () =>{
    console.log('server running on port ' + PORT)
});

