const express = require('express')
const router = express.Router()
const moment = require('moment')

const { models } = require('../models')

router.post('/', async function(req, res, next) {
    let { licensePlate } = req.body
  
    try {
  
      if (!licensePlate) {
        res.status(400).json({msg: "License plate is required"})
        return
      }

      let query = models.Entrance.findOne({
        licensePlate,
        valid: true
      })
      let validEntrance = await query.exec()
  
      if (!validEntrance) {
        res.status(422).json({msg: "The entrance of the vehicle was not registered"})
        return
      }

      let departure = new models.Departure({
        licensePlate,
        date: moment()
      })
      await departure.save()

      // Acciones posteriores al registro de una salida dependiendo del tipo de vehículo
      // TODO el retorno de esto para el response del endpoint
      await departure.postActions(validEntrance)

      // Se marca la entrada como no válida
      validEntrance.valid = false
      await validEntrance.save()
  
      let result = {
        id: departure._id,
        licensePlate: departure.licensePlate,
        date: departure.date
      }
  
      res.status(200).json(result)
  
    } catch (error) {
      next(error, req, res, next)
    }
  
  })

  module.exports = router