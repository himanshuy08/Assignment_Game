require('dotenv').config(); 
const Player = require('../models/Player'); 
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const jwt = require('jsonwebtoken'); // Import jsonwebtoken for token generation

// Create a new player
const createPlayer = async (req, res) => {
    try {
        const { name, email, password, position, nationality } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

        const player = new Player({
            name,
            email,
            password: hashedPassword,
            position,
            nationality,
            team: null // No team assigned initially
        });
        
        await player.save(); 
        res.status(201).json({ message: 'Player created successfully', player });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating player', error: error.message });
    }
};

// Login a player
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Player.findOne({ email });
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password); // Check password
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        // Use JWT secret from environment variables
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Generate token

        res.status(200).json({ message: 'Login successful', token, userId: user._id });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};

// Get all players
const getAllPlayers = async (req, res) => {
    try {
        const players = await Player.find(); // Fetch all players
        res.status(200).json(players);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching players', error });
    }
};

// Delete a player by ID
const deletePlayer = async (req, res) => {
    try {
        await Player.findByIdAndDelete(req.params.id); // Delete player from database
        res.status(200).json({ message: 'Player deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting player', error });
    }
};

module.exports = {
    createPlayer,
    login,
    getAllPlayers,
    deletePlayer,
};
