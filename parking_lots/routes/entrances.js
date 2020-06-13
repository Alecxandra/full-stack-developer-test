const express = require('express')
const router = express.Router()
const moment = require('moment')
const passport = require('passport')
const { models } = require('../models')

router.post('/', passport.authenticate('bearer', { session: false }), async function(req, res, next) {
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
  
      if (validEntrance) {
        res.status(422).json({msg: "An active entrance already exists"})
        return
      }
  
      let entrance = new models.Entrance({
        licensePlate,
        date: moment()
      })
  
      await entrance.save()
  
      let result = {
        id: entrance._id,
        licensePlate: entrance.licensePlate,
        date: entrance.date,
        valid: entrance.valid || false
      }
  
      res.status(200).json(result)
  
    } catch (error) {
      next(error, req, res, next)
    }
  
  })

  module.exports = router