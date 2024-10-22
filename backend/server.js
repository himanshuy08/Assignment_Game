const express = require('express'); 
const cors = require('cors');
const connectDB = require('./utils/database'); // Import database connection utility
const teamRoutes = require('./routes/teamRoutes'); // Import team routes
const playerRoutes = require('./routes/playerRoutes'); // Import player routes

const app = express(); 

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cors()); // Enable CORS for all routes

connectDB(); // Connect to the database

// Define routes for teams and players
app.use('/teams', teamRoutes); 
app.use('/players', playerRoutes);


const PORT = process.env.PORT || 3000; 

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); 
});
