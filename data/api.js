const express = require('express');
const mysql = require('mysql');
const cors = require ('cors');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


const app = express();
const port = process.env.PORT || 8080


app.listen(port, () => console.log('Listen on port ' + port))
//Mysql

app.use(function(req, res, next){
    res.locals.connection = mysql.createConnection({
    connectionLimit : 10,
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'ProjetIntegration'
});
    res.locals.connection.connect();
    next();
});

app.use(cors());

//Permet de récupérer les informations de tous les bois
app.get('/bois', function(req, res, next){ 
    res.locals.connection.query('Select * from Bois', function(error, results, fields){
        if (error) throw error;
        res.send(JSON.stringify({results}));
    })
});

//Permet de récupérer les informations d'un bois avec son id passé en paramètre
app.get('/bois/:id',function(req, res, next){
    res.locals.connection.query('Select * from Bois where id = ?', [req.params.id], function(error, results, fields){
        if(error) throw error;
        res.send(JSON.stringify({results}));
    })
});