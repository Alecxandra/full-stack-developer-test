const mongoose = require('mongoose')

const Departure = require('./departure')
const Entrance = require('./entrance')
const OficialParking = require('./oficialParking')
const ResidentParking = require('./residentParking')
const System = require('./system')

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL)
};

const models = { Departure, Entrance, OficialParking, ResidentParking, System }

module.exports = {
  connectDb,
  models
}