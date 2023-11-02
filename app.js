const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const movieRouter = require("./routes/movies_route");
dotenv.config({ path: './config.env' });

let app = express();

mongoose.connect(process.env.LOCAL_CONN_STR).then((conn) => {
	console.log("DB Connection Successful");
}).catch((error) => {
	console.log("Some error has occured");
});

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

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log("server has started...");
});