const express = require("express");
const router = express.Router();
const userController = require("controllers/user.controller");
const { authenticateJWT } = require('utils/jwt');

router.post('/auth', userController.auth);

router.post('/', authenticateJWT, userController.create);
router.get('/count', authenticateJWT, userController.count);
router.get('/:id', authenticateJWT, userController.fetch);
router.get('/', authenticateJWT, userController.list);
router.patch('/:id', authenticateJWT, userController.update);
router.delete('/:id', authenticateJWT, userController.delete);

module.exports = router;
