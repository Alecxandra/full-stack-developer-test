const { connectDb, models } = require('../models')

let createSystemUsers = async function () {
  connectDb().then(async () => {
      let query = models.System.findOne({token: 'DFnvkE5hKVK3c12'})
      let systemUser = await query.exec()

      if(!systemUser) {
        let newSystemUser = new models.System({
            token: 'DFnvkE5hKVK3c12'
          })
          await newSystemUser.save()
      }
  });
}

createSystemUsers()
  .then(() => {
    process.exit(0)
  })
  .catch(err => console.error('\x1b[31m%s\x1b[0m', err))
