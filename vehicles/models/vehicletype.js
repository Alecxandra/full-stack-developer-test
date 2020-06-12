const mongoose = require('mongoose')

const vehicleTypeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true,
        }
    },
    { timestamps: true },
)
 
const VehicleType = mongoose.model('VehicleType', vehicleSchema)
 
module.exports = VehicleType