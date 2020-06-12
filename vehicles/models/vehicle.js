const mongoose = require('mongoose')

const vehicleSchema = new mongoose.Schema(
    {
        licensePlate: {
            type: String,
            unique: true,
            required: true,
            index: true,
        }    
    },
    { timestamps: true },
)
 
const Vehicle = mongoose.model('Vehicle', vehicleSchema)
 
module.exports = Vehicle