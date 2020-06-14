// let should = require('should')
let assert = require('assert')
let request = require('supertest')
let app = require('../app')
const { connectDb, models } = require('../models');
const TOKEN = 'DFnvkE5hKVK3c12'

let createSystemUsers = async function () {

  let query = models.System.findOne({ token: TOKEN })
  let systemUser = await query.exec()

  if (!systemUser) {
    let newSystemUser = new models.System({
      token: TOKEN
    })
    await newSystemUser.save()
  }
}

let cleanDB = async function () {
  connectDb().then(async () => {
    let query = models.System.deleteMany({})
    await query.exec()

    query = models.VehicleType.deleteMany({})
    await query.exec()

    query = models.Vehicle.deleteMany({})
    await query.exec()

    await createSystemUsers()
  })
}


describe('Vehicle types', function () {

  describe('Add vehicle type', function () {
    // beforeEach(cleanDB)
    it('should create a vehicle type', async function () {
      await cleanDB()
      let payload = {
        "code": "resident",
        "name": "Resident vehicle"
      }

      request(app)
        .post('/vehicle-types')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(payload)
        .expect(200)
        .then(response => {
          assert(response.body.code, payload.code)
          assert(response.body.name, payload.name)
        })
    })

    it('should raise http 400 when vehicle type already exists', async function (done) {
      await cleanDB()
      let payload = {
        "code": "resident",
        "name": "Resident vehicle"
      }

      let vehicleType = new models.VehicleType({
        code: payload.code,
        name: payload.name
      })

      await vehicleType.save()

      request(app)
        .post('/vehicle-types')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(payload)
        .expect(400, done)
    })
  })

})
