var express = require('express');
var router = express.Router();
var db = require('../db/dbmanager.js');




//File upload service
var multer  = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './app/images/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage })

router.post('/photo',upload.single('file'), function(req,res){
  
    console.log(req.body);
    console.log(req.file);
    //res.send("File uploaded.");
    res.status(204).end();
});





// GET service to get all existing songs in DB
router.get('/get-all-songs', function(req, res, next) {

    db.findAllSongs(function(songs){
        res.send(songs);
    }); 
});

// GET service to get single song details by id
router.get('/song/:id', function(req, res, next) {

   var id = req.params.id;

   db.findSongById(id, function(song){
     res.send(song);
   });
});

// PUT service to increase song play-count by 1
router.put('/song/play-count/:id', function(req, res, next) {

   var id = req.params.id;

   db.increasePlayCount(id, function(result){
    res.send(result);
   });
});

// PUT service to increase song download-count by 1
router.put('/song/download-count/:id', function(req, res, next) {

   var id = req.params.id;

    db.increaseDownloadCount(id, function(result){
    res.send(result);
   });
});


// GET service to get new ID
router.get('/get-new-id', function(req, res, next) {

   db.getNewId(function(result){
      res.send(result);
   });
});


// POST service to load all songs from json to db
router.put('/insert-new-song', function(req, res, next) {

    var song = req.body;

    db.getNewId(song, function(song, newId){

      db.insertNewSong(newId, song,function(result){
        res.send(result);
      });

    });
});










module.exports = router;
