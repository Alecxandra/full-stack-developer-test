const mongoose = require('mongoose')

const entranceSchema = new mongoose.Schema(
  {
    licensePlate: {
      type: String,
      required: true,
      index: true,
    },
    date: {
      type: Date,
      required: true,
    },
    valid: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true },
)

const Entrance = mongoose.model('Entrance', entranceSchema)

module.exports = Entrance