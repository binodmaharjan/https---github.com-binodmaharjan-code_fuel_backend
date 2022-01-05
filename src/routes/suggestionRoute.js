
const express = require("express");
const router = express.Router();
const {searchQuery} = require("../controller/suggestionController");

router.get("/suggest", searchQuery);

module.exports = router;
