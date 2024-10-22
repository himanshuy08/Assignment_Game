const Team = require('../models/Team'); 
const Player = require('../models/Player'); // Import the Player model
const mongoose = require('mongoose'); // Import mongoose for database operations

// Create a new team
const createTeam = async (req, res) => {
    try {
        const { name, playerIds } = req.body;

        // Validate player IDs: must be between 1 and 11 players
        if (!playerIds || playerIds.length === 0 || playerIds.length > 11) {
            return res.status(400).json({ message: 'A team must have between 1 and 11 players' });
        }

        // Check if all players exist in the database
        const players = await Player.find({ '_id': { $in: playerIds } });
        if (players.length !== playerIds.length) {
            return res.status(404).json({ message: 'One or more players not found' });
        }

        // Calculate total points of the players in the team
        const totalPoints = players.reduce((acc, player) => acc + player.points, 0);
        const captain = playerIds[0]; // Set the captain as the first player in the list

        // Create a new team instance
        const team = new Team({
            name,
            players: playerIds,
            totalPoints,
            captain,
        });

        // Save the team to the database
        await team.save();
        res.status(201).json({ message: 'Team created successfully', team });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating team', error });
    }
};

// Retrieve a team by its ID
const getTeamById = async (req, res) => {
    try {
        // Find the team and populate player and captain fields
        const team = await Team.findById(req.params.id)
            .populate('players')
            .populate('captain'); 
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }
        res.status(200).json(team);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching team', error });
    }
};

// Retrieve all teams
const getAllTeams = async (req, res) => {
    try {
        // Find all teams and populate player and captain fields
        const teams = await Team.find()
            .populate('players')
            .populate('captain'); 
        res.status(200).json(teams);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching teams', error });
    }
};

// Delete a team by ID
const deleteTeam = async (req, res) => {
    try {
        // Delete the team from the database
        await Team.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Team deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting team', error });
    }
};

module.exports = {
    createTeam,
    getTeamById,
    getAllTeams,
    deleteTeam,
};
