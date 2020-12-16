require('dotenv').config();

const express = require('express');
const db = require('./db');
const app = express();

app.use(require('./middleware/headers'));
app.use(express.json())

// app.use(express.static(__dirname + '/public'));
// console.log(__dirname);
// app.get('/', (req,res)=> res.render('index'));

db.authenticate()
.then(()=>db.sync())
.then(()=>{
    app.listen(process.env.PORT, ()=> console.log(`[SERVER:] App is listening on Port ${process.env.PORT}`))
})
.catch((err)=>{
    console.log('[SERVER:] Server Crashed');
    console.error(err);
})