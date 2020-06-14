const mongoose = require('mongoose')

const systemSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
  },
  { timestamps: true },
)

const System = mongoose.model('System', systemSchema)

module.exports = System