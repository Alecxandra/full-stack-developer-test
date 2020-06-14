const { connectDb, models } = require('../models');

let createSystemUsers = async function () {
  connectDb().then(async () => {
      let query = models.System.findOne({token: 'DFnvkE5hKVK3c12'})
      let systemUser = await query.exec()

      if(!systemUser) {
        let newSystemUser = new models.System({
            token: 'DFnvkE5hKVK3c12'
          })
          await newSystemUser.save()
      }

      // Tipos de vehículo

      // Residente
      query = models.VehicleType.findOne({code: 'res'})
      let residentVehicle = await query.exec()

      if(!residentVehicle) {
        let newResidentVehicle = new models.VehicleType({code: 'res'})
        await newResidentVehicle.save()
      }

      // Oficial
      query = models.VehicleType.findOne({code: 'of'})
      let oficialVehicle = await query.exec()

      if(!oficialVehicle) {
        let newOficialVehicle = new models.VehicleType({code: 'of'})
        await newOficialVehicle.save()
      }
  });
}

createSystemUsers()
  .then(() => {
    process.exit(0)
  })
  .catch(err => console.error('\x1b[31m%s\x1b[0m', err))