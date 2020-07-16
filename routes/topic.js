const express = require('express');
const router = express.Router();
const con = require('../database/mysqldb');
var jwt = require('jsonwebtoken');
const multer = require('multer');
const URL = "http://localhost:4000/images/"
const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
      callBack(null, './public/images')
  },
  filename: (req, file, callBack) => {
      callBack(null, `${file.originalname}`)
  }
})
const upload = multer({ storage: storage });
router.post("/addtopic", upload.single('file'), function (req, res) {
  jwt.verify(req.headers.authorization, 'usertoken', function(err, decoded) {
        if (decoded && decoded.token && decoded.token.role === "ADMIN" ){
          if (req.file && req.file.filename){

        var reg_sql ="call add_topic('"+req.query.name+"','"+URL+req.file.filename+ "')"
            con.query(reg_sql, function (err, result) {
              if (err){
                res.status(400).json({error:'Some error occured please try again later'})
              }else {
                res.json({message:result[0]})
              }
              });  
            }else {
              res.send({message :"Please select image"})
            }
        }else {
            res.send({message :"Unauthorized"})
        }
    });
  

})
// get all topics . get by id 
router.get("/gettopics/:id", function (req, res) {
    jwt.verify(req.headers.authorization, 'usertoken', function(err, decoded) {
        if (decoded && decoded.token ){
        var reg_sql ="select * from tb_topic"
        if (req.params.id !== '0'){
            var reg_sql ="select * from tb_topic where id = "+req.params.id
        }
            con.query(reg_sql, function (err, result) {
              if (err){
                res.status(400).json({error:'Some error occured please try again later'})
              }else {
                res.json({message:result})
              }
              });
        }else {
            res.send({message :"Unauthorized"})
        }
    });
})
module.exports = router;
