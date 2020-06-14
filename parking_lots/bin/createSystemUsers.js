const { connectDb, models } = require('../models')
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
}

createSystemUsers()
  .then(() => {
    process.exit(0)
  })
