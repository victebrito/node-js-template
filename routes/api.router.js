const express = require("express");
const router = express.Router();
const apiController = require("controllers/api.controller");
const { authenticateAPI } = require('utils/jwt');

// API
router.get('/dummy', authenticateAPI, apiController.dummy);

module.exports = router;
