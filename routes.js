
module.exports = function(app){

	app.get('/api/songs', function(req, res){
	
		var json = {
			name: "pepito",
			num: 123
		}

		// get from db all songs

		res.send(json);
	});

	// app.get('/api/songs', function(req, res){

	// });

	// app.get('/api/songs', function(req, res){

	// });
};