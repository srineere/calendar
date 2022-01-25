const mongoose = require('mongoose')

const meetSchema = new mongoose.Schema({
    title: {
        type:String,
        required: true
    },
    description: {
        type:String
    },
    start: {
        type: Date
    },
    end: {
        type: Date
    },
    objid: {
        type: String,
        required: true
    }
}, { timestamps: true})

const Meet = mongoose.model('Meet', meetSchema)
module.exports= Meet;