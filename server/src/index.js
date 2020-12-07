const express = require('express');
//Logger that automatically logs all the incoming requests
const morgan = require('morgan');
//Adds/Removes certain headers to secure the app
const helmet = require('helmet');
//Cross-origin resource sharing
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const userRoutes = require('./api/user');
const productRoutes = require('./api/product');

//DB connection with Mongo DB
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
});
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to Database!'));

const app = express();
app.use(express.json());
app.use(morgan('common'));
app.use(helmet());
//This is CORS-enabled for all origins
app.use(cors());

app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);

const port = process.env.PORT || 3003;

//Listen to the port
app.listen(port, () => {
	console.log(`Listening to http:localhost:${port}`);
});
