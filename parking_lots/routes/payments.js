const express = require('express')
const router = express.Router()
const fs = require('fs').promises
const table = require('easy-table')
const axios = require('axios')
const CODE_RESIDENT = "res"

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

    // Se obtiene la tarifa para residentes
    let response = await axios.get(`http://tariffs_ws/api/tariffs/${CODE_RESIDENT}`)
    let price = response.data.price

    let query = models.ResidentParking.find({})
    let residents = await query.exec()

    var fileData = residents.map(resident => {
      return {
        licensePlate: resident.licensePlate, 
        parkingTime: resident.parkingTime,
        amountToPay: (resident.parkingTime * price).toFixed(2),
      }
    })

    let fileTable = new table()

    fileData.forEach(row => {
      fileTable.cell('Núm. placa', row.licensePlate)
      fileTable.cell('Tiempo estacionado (min.)', row.parkingTime)
      fileTable.cell('Cantidad a pagar', row.amountToPay)
      fileTable.newRow()
    })
    
    await fs.writeFile('/tmp/residents_payment_report.txt', fileTable.toString());

    res.download('/tmp/residents_payment_report.txt')

  } catch (error) {
    next(error, req, res, next)
  }

})

module.exports = router