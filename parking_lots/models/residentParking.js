const mongoose = require('mongoose')

const residentParkingSchema = new mongoose.Schema(
    {
        licensePlate: {
            type: String,
            required: true,
            index: true,
        },
        entryDate: {

        },    
    },
    { timestamps: true },
)
 
const ResidentParking = mongoose.model('ResidentParking', residentParkingSchema)
 
module.exports = ResidentParking