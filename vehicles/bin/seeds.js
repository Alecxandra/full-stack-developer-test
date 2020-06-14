const { connectDb, models } = require('../models');
console.log("running seed")
let createSystemUsers = async function () {

  await connectDb()

  let query = models.System.findOne({ token: 'DFnvkE5hKVK3c12' })
  let systemUser = await query.exec()

  if (!systemUser) {
    let newSystemUser = new models.System({
      token: 'DFnvkE5hKVK3c12'
    })
    await newSystemUser.save()
    console.log(newSystemUser)
  } else {
    console.log(systemUser)
  }

  // Tipos de vehículo

  // Residente
  query = models.VehicleType.findOne({ code: 'res' })
  let residentVehicle = await query.exec()

  if (!residentVehicle) {
    let newResidentVehicle = new models.VehicleType({ code: 'res' })
    await newResidentVehicle.save()
    console.log(newResidentVehicle)
  } else {
    console.log(residentVehicle)
  }

  // Oficial
  query = models.VehicleType.findOne({ code: 'of' })
  let oficialVehicle = await query.exec()

  if (!oficialVehicle) {
    let newOficialVehicle = new models.VehicleType({ code: 'of' })
    await newOficialVehicle.save()
    console.log(newOficialVehicle)
  } else {
    console.log(oficialVehicle)
  }
}

createSystemUsers()
  .then(() => {
    process.exit(0)
  })