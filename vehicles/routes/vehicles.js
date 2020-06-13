const express = require('express');
const router = express.Router();
const { models } = require('../models');

/* POST agregar un vehículo */
router.post('/', async function(req, res, next) {
  let { licensePlate, type } = req.body

  try {

    if (!type) {
      res.status(400).json({msg: "Type is required"})
      return
    }

    /* Se obtiene el tipo de vehículo con el código recibido */
    let query = models.VehicleType.findOne({
      code: type
    })

    let vehicleType = await query.exec()

    if (!vehicleType) {
      res.status(404).json({msg: "Vehicle type not found"})
      return
    }

    let vehicle = new models.Vehicle({
      licensePlate,
      type: vehicleType._id,
    })

    await vehicle.save()

    let result = {
      id: vehicle._id,
      licensePlate: vehicle.licensePlate,
      type: {
        id: vehicleType._id,
        code: vehicleType.code,
        name: vehicleType.name,
      }
    }

    res.status(200).json(result)

  } catch (error) {
    next(error, req, res, next)
  }

})

router.get('/:licensePlate', async function(req, res, next) {
  try {
    console.log("HOLIWISSSSS")
    let query = models.Vehicle.findOne({
      licensePlate: req.params.licensePlate
    }).populate('type')

    let vehicle = await query.exec()

    if (!vehicle) {
      res.status(404).json({msg: "Vehicle not found"})
      return
    }
    
    let result = {
      id: vehicle._id,
      licensePlate: vehicle.licensePlate,
      type: {
        id: vehicle.type._id,
        code: vehicle.type.code,
        name: vehicle.type.name,
      }
    }

    res.status(200).json(result)

  } catch (error) {
    next(error, req, res, next)
  }
})

module.exports = router
