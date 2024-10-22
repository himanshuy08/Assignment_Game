const express = require('express');
const { createPlayer, getAllPlayers,deletePlayer,login} = require('../controllers/playerController');
const router = express.Router();

router.post('/signup', createPlayer);
router.post('/login', login);
router.get('/', getAllPlayers);
router.delete('/:id', deletePlayer);

module.exports = router;
