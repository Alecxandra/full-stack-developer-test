const mongoose = require('mongoose')

const vehicleTypeSchema = new mongoose.Schema(
    {
        code: {
            type: String,
            unique: true,
            required: true,
        },
        name: String,
    },
    { timestamps: true },
)
 
const VehicleType = mongoose.model('VehicleType', vehicleTypeSchema)
 
module.exports = VehicleType