const express = require('express');
const router = express.Router();
const con = require('../database/mysqldb');
var jwt = require('jsonwebtoken');

// -- register user 
router.post("/register-user", function (req, res) { 
    if (req.query.name && req.query.email && req.query.password){
        var reg_sql;
        if (req.query.role === "ADMIN"){
             reg_sql ="call add_user('"+req.query.email+"','"+req.query.password+ "','"+"ADMIN"+ "','"+req.query.name + "')"
        }else {
            reg_sql ="call add_user('"+req.query.email+"','"+req.query.password+ "','"+"USER"+ "','"+req.query.name + "')"

        }
    }else {
        res.send("Please enter all information first")
    }
    con.query(reg_sql, function (err, result) {
        
      if (err){
          
        res.status(400).json({error:'Some error occured please try again later'})
      }else {
        res.json({message:result[0]})
      }
      });
});

// --auth user 

router.post("/authenticate", function (req, res) { 
    let reg_sql ="call authenticate('"+req.query.email+"','"+req.query.password+ "')"
    con.query(reg_sql, function (err, result) {
      if (err){
        res.status(400).json({error:'Some error occured please try again later'})
      }else {
        let data = result[0][0]
        var token = jwt.sign({token :{email : data.email, role :data.role}}, 'usertoken', { expiresIn:3000 });
        if (data.message === "Success"){
          data.token = token 
        }
        res.json({message:data})
      }
      });
});

module.exports = router;
