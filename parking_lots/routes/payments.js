const express = require('express')
const router = express.Router()
const moment = require('moment')

const { models } = require('../models')

router.post('/start-month', async function (req, res, next) {

  try {

    // Se eliminan las estancias de los vehículos oficiales
    await models.OficialParking.deleteMany({})

    // Se coloca en 0 el tiempo de estacionamiento de los residentes
    await models.ResidentParking.updateMany({}, { parkingTime: 0 })

    res.status(200).json({})

  } catch (error) {
    next(error, req, res, next)
  }

})

module.exports = router