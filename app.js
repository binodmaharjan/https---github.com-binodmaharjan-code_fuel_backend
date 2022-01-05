const express = require('express');
const cors = require('cors');
const route = require('./src/routes/suggestionRoute')

const app = express()
app.use(cors());
app.use(express.json())
app.use("/api", route)

module.exports = app;