const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middleware/error');
const bodyParser = require('body-parser');
const app = express();
const path = require('path')

// Load environment variables
dotenv.config({ path: "backend/config/config.env" });

// Middleware setup
app.use(cors());
app.use(express.json()); 
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const user = require("./routes/userRoute.js")
app.use('/api/v1', user);

// app.get('/', (req, res) => {
//     app.use(express.static(path.resolve(__dirname, "frontend", "build")))
//     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
// })

// Error handling middleware - register only once
app.use(errorMiddleware);

module.exports = app;
