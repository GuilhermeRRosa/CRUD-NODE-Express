/* 
    Para utilizar o express, utilize o comando 'import' abaixo.
    Defina o "type" "module" no package.json para trabalhar com ECMA6
    Caso contrário usará commonJS com o comando abaixo:
    const express = require('express');
*/
import express from 'express';
import { dbcon } from './db/SequelizeConnection.js';
import { User } from './models/User.js';

async function initDB(){
    try {
        await dbcon.authenticate();
        await dbcon.sync();
    } catch (error) {
        console.error("Failed to connect to database", error);
    }
}

async function createSteve(){
    try {
        await initDB();
        const steve = User.build({
            nome: "Steve",
            email: "steve@email.com"
        });
        console.log(steve instanceof User);
        console.log(steve.nome);
        await steve.save();
    } catch (error) {
        console.error("error while creating Steve: ", error);
    }
}
createSteve();

const app = express();

app.get('/', function(req, res){
    var myObj = "name";
    res.json(myObj);
})

app.listen("8081", ()=>{
    console.log('Server Up on PORT 8081')
})