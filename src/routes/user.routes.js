const router = require('express').Router();
const { createUser } = require('../controllers/user.controller');
const auth = require('../middlewares/auth.middleware');

router.post('/', createUser);

module.exports = router;
