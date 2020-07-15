const express = require('express');
const router = express.Router();
const con = require('../database/mysqldb');
var jwt = require('jsonwebtoken');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
      callBack(null, './public/devices')
  },
  filename: (req, file, callBack) => {
      callBack(null, `${file.originalname}`)
  }
})
const uploads = multer({ storage: storage });
  
router.post("/addarticle", uploads.single('file'), function (req, res) {

    jwt.verify(req.headers.authorization, 'usertoken', function(err, decoded) {
        if (decoded && decoded.token && decoded.token.role === "ADMIN" ){
 
         var reg_sql ="call add_articles('"+req.query.title+"',"+req.query.topic+ ",'"+req.query.content+ "',"+req.query.isfeatured + ")"
        
            con.query(reg_sql, function (err, result) {
                
              if (err){
                  console.log('err', err);
                  
                res.status(400).json({error:'Some error occured please try again later'})
              }else {
                res.json({message:result[0]})
              }
              });
        }else {
            res.send({message :"Unauthorized"})
        }
    });
})

router.post("/updatearticle", uploads.single('file'), function (req, res) {

    jwt.verify(req.headers.authorization, 'usertoken', function(err, decoded) {
        if (decoded && decoded.token && decoded.token.role === "ADMIN" ){
 
         var reg_sql ="call update_articles("+req.query.articleid+",'"+req.query.title+"',"+req.query.topic+ ",'"+req.query.content+ "',"+req.query.isfeatured + ")"
        console.log(reg_sql);
            con.query(reg_sql, function (err, result) {
                
              if (err){
                  console.log('err', err);
                  
                res.status(400).json({error:'Some error occured please try again later'})
              }else {
                res.json({message:result[0]})
              }
              });
        }else {
            res.send({message :"Unauthorized"})
        }
    });
})

// get all articles by topic id
router.get("/getarticlebytopicid/:id", uploads.single('file'), function (req, res) {

        jwt.verify(req.headers.authorization, 'usertoken', function(err, decoded) {
            // if loggined
        if (decoded && decoded.token){
            var reg_sql ="select * from tb_articles where topic = "+req.params.id
        }else {
            // if not logined
            var reg_sql ="select * from tb_articles where topic = "+req.params.id +" and isFeatured=true"

        }
        con.query(reg_sql, function (err, result) {        
              if (err){
                res.status(400).json({error:'Some error occured please try again later'})
              }else {
                res.json({message:result})
              }
              });
        
    });
})
// get articles by id 
router.get("/getArticleByid/:id", uploads.single('file'), function (req, res) {
    let reg_sql= "call getArticlebyid("+req.params.id+")"
    con.query(reg_sql, function (err, result) {        
          if (err){
            res.status(400).json({error:'Some error occured please try again later'})
          }else {
            res.json({message:result})
          }
          });
    
})
module.exports = router;
