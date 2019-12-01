const sequelize = require('./index')

const MODELS = []
MODELS.push(require('./models/User'))
MODELS.push(require('./models/Type'))
MODELS.push(require('./models/Item').Tag)
MODELS.push(require('./models/Item').Category)
MODELS.push(require('./models/Item').Item)
MODELS.push(require('./models/ItemTag'))
MODELS.push(require('./models/ItemCategory'))
MODELS.push(require('./models/Comment'))
MODELS.push(require('./models/Item').Rating)

async function forceSyncModels (MODELS) {
  for (const model of MODELS) {
    await model.sync({ force: true })
  }
}

sequelize
  .authenticate()
  .then(async () => {
    await forceSyncModels(MODELS)
  })
