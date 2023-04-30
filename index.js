// const express = require('express');
import express from 'express';

const app = express();

app.get('/', function(req, res){
    res.send("test");
})

app.listen("8081", ()=>{
    console.log('Server Up on PORT 8081')
})