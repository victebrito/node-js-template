const express = require("express");
const router = express.Router();

const apiRouter = require("routes/api.router");
//const userRouter = require("routes/user.router");

router.use('/v1', apiRouter);

//router.use('/users', userRouter);


module.exports = router;
