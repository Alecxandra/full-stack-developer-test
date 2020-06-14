const mongoose = require('mongoose')

const residentParkingSchema = new mongoose.Schema(
  {
    licensePlate: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
    parkingTime: {
      type: Number,
      required: true,
      default: 0
    }
  },
  { timestamps: true },
)

const ResidentParking = mongoose.model('ResidentParking', residentParkingSchema)

module.exports = ResidentParking