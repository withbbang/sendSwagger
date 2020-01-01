'use strict';

const db_start = require("../../common").db_start;
const { pool } = require("../../common");
const fs = require('fs')

module.exports.getFile = (req, rsp)=>{
    let file = fs.readFileSync(__dirname+'/image.jpg')
    rsp.send(file)
}

module.exports.getInfos =(req, rsp)=>{
    pool.query('select customer_id, email from customer', [], (error, results) => {
        if (error) {
            throw error;
        }
        rsp.json({informations : results.rows})
    });
}

module.exports.getInfo = (req, rsp)=>{
    pool.query(`select customer_id, email from customer where customer_id=${req.swagger.params.id.value}`, [], (error, results) => {
        if (error) {
            throw error;
        }
        rsp.json(results.rows[0])
    })
}

module.exports.deleteInfo = (req, rsp)=>{
    pool.query(`delete from customer where customer_id = ${req.swagger.params.id.value}`, [], (error, results) => {
        if (error) {
            throw error;
        }
        rsp.json({message : `customer who has id of ${req.swagger.params.id.value} is deleted`})
    })
}

module.exports.getInfobyHeaders = (req, rsp)=>{
    pool.query(`select customer_id, email from customer where customer_id=${req.headers.id}`, [], (error, results) => {
        if (error) {
            throw error;
        }
        rsp.json(results.rows[0])
    })
}