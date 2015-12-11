var express = require('express');
var router = express.Router();
var db = require('../db/dbmanager.js');

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

// POST service to load all songs from json to db
router.post('/load-all-songs', function(req, res, next) {

		db.loadAllFromJson(function(result){
				res.send(result);
		});
});

module.exports = router;
