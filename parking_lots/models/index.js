const mongoose = require('mongoose')

const Departure = require('./departure')
const Entrance = require('./entrance')
const OficialParking = require('./oficialParking')
const ResidentParking = require('./residentParking')

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL)
};

const models = { Departure, Entrance, OficialParking, ResidentParking }

module.exports = {
  connectDb,
  models
}