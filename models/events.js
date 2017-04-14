const mongoose = require('mongoose');

// Event object schema
var Schema = mongoose.Schema
 
var eventsSchema = new Schema({
    title: {type: String, unique: true, required: true},
    subtitle: {type: String},
    startDate: {type: String},
    startTime: {type: String},
    endDate: {type: String},
    endTime: {type: String},
    eventType: [String],
    eventType2: [String],
    image: {type: String},
    details: {type: String},
    location: {type: String},
    price: {type: Number},
    organizer: {type: String}
});

mongoose.model('events', eventsSchema);