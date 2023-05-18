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
        await dbcon.sync({force: true});
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
        await steve.save();
        const maria = User.create({
            nome: 'Maria',
            email: 'maria@email.com'
        })
    } catch (error) {
        console.error("error while creating Steve: ", error);
    }
}
createSteve();

const app = express();

// Middleware para fazer o parsing do corpo das requisições como JSON
app.use(express.json());

// Get All Users
app.get('/users/', function(req, res){
    (async () => {
        dbcon.sync();
        const users = await User.findAll();
        res.json(users);
        //console.log("imprimindo: "+JSON.stringify(users, null, 2));
    })();
})

// Get User by ID
app.get('/users/:userId', function(req, res){
    (async ()=>{
        dbcon.sync();
        const user = await User.findByPk(parseInt(req.params.userId));
        res.json(user);
    })();
})

// Delete User by ID
app.delete('/users/:userId', function(req, res){
    (async ()=>{
        dbcon.sync();
        const userId = parseInt(req.params.userId);
        const exists = await User.findOne({
            where: {
                id: userId
            }
        })

        if(exists){
            const result = await User.destroy({
                where: {
                    id: userId
                }
            });
            res.status(204).json();
        } else {
            res.status(404).json({"message":"user with ID: "+userId+" not found."})
        }
        
    })();
})

// Create a new User
app.post('/users', function(req, res){
    (async ()=>{
        try {
            const user  = await User.create(req.body);            
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({
                "message": "Error while creating user",
                "error": error
            })
        }
    })();
})

// Update Users
app.put('/users/:userId', async (req, res)=> {
    try {
        const userId = parseInt(req.params.userId);
        const user = await User.findByPk(parseInt(userId));

        if(!user){
            return res.status(404).json({
                error: "User not found"
            })
        }
        await User.update(req.body, {
            where: {
                id: userId
            }
        });       
        res.status(200).json();
    } catch (error) {
        res.status(500).json({
            error: error
        });
    }
})

app.listen("8081", ()=>{
    console.log('Server Up on PORT 8081')
})