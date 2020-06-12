const mongoose = require('mongoose')
 
const Vehicle = require('./vehicle')
const VehicleType = require('./vehicleType')
 
const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL)
};
 
const models = { Vehicle, VehicleType }
 
module.exports = {
    connectDb,
    models
}