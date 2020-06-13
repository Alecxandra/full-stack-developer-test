const express = require('express');
const router = express.Router();
const passport = require('passport')
const { models } = require('../models');


/* POST agregar tipo de vehículo */
router.post('/', passport.authenticate('bearer', { session: false }), async function(req, res, next) {
  let { code, name } = req.body
  
  try {
    let vehicleType = new models.VehicleType({ 
      code,
      name
    })

    await vehicleType.save()

    res.status(200).json({
      id: vehicleType._id,
      code: vehicleType.code,
      name: vehicleType.name,
    })
  } catch (error) {
    next(error, req, res, next)
  }
})

/* GET lista tipo de vehículo */
router.get('/', passport.authenticate('bearer', { session: false }), async function(req, res, next) {
  try {

    let query = models.VehicleType.find({})
    let vehicleTypes = await query.exec()
    
    let result = vehicleTypes.map(vehicleType => {
      return {
        id: vehicleType._id,
        code: vehicleType.code,
        name: vehicleType.name,
      }
    })

    res.status(200).json(result)

  } catch (error) {
    next(error, req, res, next)
  }
})

/* GET lista tipo de vehículo */
router.get('/:code', passport.authenticate('bearer', { session: false }), async function(req, res, next) {
  try {

    let query = models.VehicleType.findOne({
      code: req.params.code
    })

    let vehicleType = await query.exec()


    if (!vehicleType) {
      res.status(404).json({msg: "Vehicle type not found"})
      return
    }
    
    let result =  {
      id: vehicleType._id,
      code: vehicleType.code,
      name: vehicleType.name,
    }

    res.status(200).json(result)

  } catch (error) {
    next(error, req, res, next)
  }
})

module.exports = router
