const express = require('express');
const { createTeam, getTeamById, getAllTeams, deleteTeam } = require('../controllers/teamController');
const router = express.Router();

router.post('/', createTeam);
router.get('/', getAllTeams);
router.get('/:id', getTeamById);
router.delete('/:id', deleteTeam);


module.exports = router;
