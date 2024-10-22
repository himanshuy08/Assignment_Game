const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    points: {
        type: Number,
        default: 0,
    },
    email: {
        type: String,
        required: true, 
        unique: true,  
        match: [/.+\@.+\..+/, 'Please enter a valid email address'], 
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',  
        default: null, 
    },
    password:{
       type:String,
       required:true,
    },
    nationality: {
        type: String,
        required: false,
    },
    matchesPlayed: {
        type: Number,
        default: 0,
    },
    isCaptain: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
