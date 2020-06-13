const mongoose = require('mongoose')
 
const Vehicle = require('./vehicle')
const VehicleType = require('./vehicleType')
const System = require('./system')
 
const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL)
};
 
const models = { Vehicle, VehicleType, System }
 
module.exports = {
    connectDb,
    models
}