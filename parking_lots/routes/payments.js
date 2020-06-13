const express = require('express')
const router = express.Router()
const fs = require('fs').promises

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

router.get('/residents/generate-report', async function (req, res, next) {

  try {
    let content = 'holiwis esto es un file'
    
    await fs.writeFile('/tmp/residents_payment_report.txt', content);

    res.download('/tmp/file1.txt')

  } catch (error) {
    next(error, req, res, next)
  }

})

module.exports = router