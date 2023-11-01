const express = require("express");
const morgan = require("morgan");

const movieRouter = require("./routes/movies_route");

let app = express();

const logger = function (req, res, next) {
	console.log('Custom middleware called');
	next();
}

app.use(express.json());
app.use(morgan('dev'));
app.use(logger);
app.use((req, res, next) => {
	req.requestedAt = new Date().toISOString();
	next();
});

app.use('/api/v1/movies/', movieRouter);

const port = 3000;
app.listen(port, () => {
	console.log("server has started...");
});