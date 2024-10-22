const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    players: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player', 
        required: true, 
    }],
    totalPoints: {
        type: Number,
        default: 0,
    },
   
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        required: true,
    },
}, { timestamps: true });

const Team = mongoose.model('Team', teamSchema);
module.exports = Team;
