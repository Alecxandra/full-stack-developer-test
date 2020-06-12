const mongoose = require('mongoose')
 
const Vehicle = require('./vehicle')
 
const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL)
};
 
const models = { Vehicle }
 
module.exports = {
    connectDb,
    models
}