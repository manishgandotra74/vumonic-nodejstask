const express = require('express');
const router = express.Router();
const con = require('../database/mysqldb');
var jwt = require('jsonwebtoken');
const multer = require('multer');
const URL = "http://localhost:4000/images/"
var Article = require('../models/article');

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, './public/images')
  },
  filename: (req, file, callBack) => {
    callBack(null, `${file.originalname}`)
  }
})
const upload = multer({ storage: storage });

router.post("/addarticle", upload.single('file'), function (req, res) {
  jwt.verify(req.headers.authorization, 'usertoken', function (err, decoded) {
    if (decoded && decoded.token && decoded.token.role === "ADMIN") {
      const article = new Article({
        title: req.body.title,
        topic: req.body.selectedTopic,
        content: req.body.Content,
        isFeatured: req.body.isfeatured,
        image: req.body.image

      });
      article.save({}).then(art => {
        console.log(':::::::', art);
        if (art._id) {
          res.send({ message: "Article saved Successfully" })

        }
      })

    } else {
      res.send({ message: "Unauthorized" })
    }
  });

})

router.post("/updatearticle", function (req, res) {
  jwt.verify(req.headers.authorization, 'usertoken', function (err, decoded) {
    if (decoded && decoded.token && decoded.token.role === "ADMIN") {
      console.log(req.body);
  Article.updateOne({
    _id: req.body.id,   

  }, {
    title: req.body.title,
    topic: req.body.selectedTopic,
    content: req.body.Content,
    isFeatured: req.body.isfeatured,
    image: req.body.image
  
  }).then(data => {
    if (data.nModified === 1) {
      res.status(200).json({
        message: 'Article Updated Successfully'
      })
    }else {
      res.status(200).json({
        message: 'Article Updated Successfully'
      })
    }
  })
    } else {
      res.send({ message: "Unauthorized" })
    }
  });
})

// get all articles by topic id
router.get("/getarticlebytopicid/:id", function (req, res) {
  jwt.verify(req.headers.authorization, 'usertoken', function (err, decoded) {
    // if loggined
    if (decoded && decoded.token) {
      Article.find({ topic: req.params.id }).then(article => {
        res.send({ data: article })
      })
    } else {
      // if not logined
      Article.find({ topic: req.params.id, isFeatured: false }).then(article => {
        res.send({ data: article })
      })
    }


  });
})
// get articles by id 
router.get("/getArticleByid/:id", function (req, res) {
  Article.find({ _id: req.params.id }).then(article => {
    res.send({ data: article })
  })
})


// get all articles
router.get("/getArticles/:id", function (req, res) {
  // if id = 1 ascending order , if 2 descending order else normal order
  jwt.verify(req.headers.authorization, 'usertoken', function (err, decoded) {
    // if loggined
    var req_sql = "call get_Articles(" + req.params.id + ")"
    con.query(req_sql, function (err, result) {
      if (err) {
        res.status(400).json({ error: 'Some error occured please try again later' })
      } else {
        res.json({ message: result })
      }
    });

  });
})
// call fetch_articles("Titlee7")
router.get("/fetcharticles/:article_name", function (req, res) {
  // if id = 1 ascending order , if 2 descending order else normal order
  jwt.verify(req.headers.authorization, 'usertoken', function (err, decoded) {
    // if loggined
    var reg_sql = "call fetch_Articles('" + req.params.article_name + "')"
    console.log(reg_sql);
    con.query(reg_sql, function (err, result) {

      if (err) {
        res.status(400).json({ error: 'Some error occured please try again later' })
      } else {
        res.json({ message: result })
      }
    });

  });
})
module.exports = router;
