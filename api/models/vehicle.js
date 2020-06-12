const mongoose = require('mongoose')

const vehicleSchema = new mongoose.Schema({
    licensePlate: String    
})
 
const Vehicle = mongoose.model('Vehicle', vehicleSchema)
 
module.exports = Vehicle