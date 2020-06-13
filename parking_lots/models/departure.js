const mongoose = require('mongoose')
const axios = require('axios')
const moment = require('moment')
const CODE_RESIDENT = 'res'
const CODE_OFICIAL = 'of'
const CODE_NO_RES = 'no_res'
const TOKEN = 'DFnvkE5hKVK3c12'

const departureSchema = new mongoose.Schema(
    {
        licensePlate: {
            type: String,
            required: true,
            index: true,
        },
        date: {
            type: Date,
            required: true,
        }
    },
    { timestamps: true },
)

departureSchema.methods.postActions = async function (validEntrance) {
    // Se identifica el tipo del vehículo

    let result = {}

    // Tiempo transcurrido entre la ultima estancia (entrada - salida)
    let entranceDate = moment(validEntrance.date)
    let departureDate = moment(this.date)
    let elapsedTime = Math.ceil(moment.duration(departureDate.diff(entranceDate)).asMinutes())

    try {

        let licensePlate = this.licensePlate
        let res = await axios.get(`http://vehicles:3000/vehicles/${licensePlate}`, {headers: {'Authorization': `Bearer ${TOKEN}`}})
        let vehicle = res.data

        if (vehicle.type.code === CODE_RESIDENT) {
            // Se acumula el tiempo que lleva estacionado

            let conditions = { licensePlate }
            let update = { $inc: { parkingTime: elapsedTime } }

            let query = mongoose.model('ResidentParking').updateOne(conditions, update);
            let residentParking = await query.exec()

            // Si el registro no existe, se crea
            if (residentParking.nModified == 0) {
                const ResidentParking = mongoose.model('ResidentParking')

                let residentParking = new ResidentParking({
                    licensePlate,
                    parkingTime: elapsedTime
                })

                await residentParking.save()
            }

            result['vehicleType'] = CODE_RESIDENT

        } else if (vehicle.type.code === CODE_OFICIAL) {
            // Se asocia la estancia (hora de entrada y hora de salida) al vehículo
            const OficialParking = mongoose.model('OficialParking')

            let oficialParking = new OficialParking({
                licensePlate,
                entryTime: validEntrance.date,
                departTime: this.date
            })

            await oficialParking.save()

            result['vehicleType'] = CODE_OFICIAL
        }

    } catch (err) {
        // Vehículo no residente
        if (err.response && err.response.status === 404) {

            // Se obtiene la tarifa de cobro para no residentes
            try {
                let res = await axios.get(`http://tariffs_ws/api/tariffs/${CODE_NO_RES}`)
                let price = res.data.price
                let payment = (elapsedTime * price).toFixed(2)
                result['amountToPay'] = payment
                result['vehicleType'] = CODE_NO_RES

            } catch (err) {
                result['vehicleType'] = CODE_NO_RES
                result['amountToPay'] = 'Service not available'
            }
        }
    }

    return result
}

const Departure = mongoose.model('Departure', departureSchema)

module.exports = Departure