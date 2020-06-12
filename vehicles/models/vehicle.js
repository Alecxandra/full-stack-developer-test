const mongoose = require('mongoose')

const vehicleSchema = new mongoose.Schema(
    {
        licensePlate: {
            type: String,
            unique: true,
            required: true,
            index: true,
        },
        type: {
            type: mongoose.Schema.Types.ObjectId, ref: 'VehicleType'
        },    
    },
    { timestamps: true },
)
 
const Vehicle = mongoose.model('Vehicle', vehicleSchema)
 
module.exports = Vehicle