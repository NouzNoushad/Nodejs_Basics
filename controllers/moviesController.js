const fs = require("fs");

let movies = JSON.parse(fs.readFileSync('./data/movies.json', 'utf-8'));

exports.checkId = (req, res, next, value) => {
	console.log("movie id is " + value);
	let movie = movies.find((movie) => movie.id == value * 1);

	if (!movie) {
		return res.status(400).json({
			status: 'fail',
			message: "Movie with id " + value * 1 + " is not found"
		});
	}
	next();
}

exports.validateBody = (req, res, next) => {
	if (!req.body.name || !req.body.released) {
		return res.status(400).json({
			status: 'fail',
			message: 'Not a valid movie data'
		});
	}
	next();
}

exports.getAllMovies = (req, res) => {
	res.status(200).json({
		status: "success",
		requestedAt: req.requestedAt,
		count: movies.length,
		data: {
			movies: movies
		}
	});
}

exports.getMovie = (req, res) => {
	let id = req.params.id * 1;
	let movie = movies.find((movie) => movie.id == id);
		res.status(200).json({
			status: "success",
			data: {
				movies: movie
			}
		});
	}
	

exports.createMovie = (req, res) => {
	const newId = movies[movies.length - 1].id + 1;
	const newMovie = Object.assign({ id: newId }, req.body);
	movies.push(newMovie);
	fs.writeFile("./data/movies.json", JSON.stringify(movies), (err) => {
		res.status(201).json({
			status: "success",
			data: {
				movies: newMovie
			}
		})
	});
	res.send('Created');
}

exports.updateMovie = (req, res) => {
	let id = req.params.id * 1;
	let movie = movies.find((movie) => movie.id == id);

		let movieIndex = movies.indexOf(movie);

		Object.assign(movie, req.body);
		movies[movieIndex] = movie;

		fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
			res.status(200).json({
				status: "success",
				data: {
					movies: movie
				}
			});
		});
	
}

exports.deleteMovie = (req, res) => {
	const id = req.params.id * 1;
	const movie = movies.find((movie) => movie.id == id);
		const movieIndex = movies.indexOf(movie);

		movies.splice(movieIndex, 1);
		fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
				res.status(204).json({
					status: "success",
					data: {
						movies: null
					}
				});
			});
	
}