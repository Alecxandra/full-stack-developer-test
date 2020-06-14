const mongoose = require('mongoose')

const oficialParkingSchema = new mongoose.Schema(
  {
    licensePlate: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
    entryTime: {
      type: Date,
      required: true,
    },
    departTime: {
      type: Date,
      required: true,
    }
  },
  { timestamps: true },
)

const OficialParking = mongoose.model('OficialParking', oficialParkingSchema)

module.exports = OficialParking