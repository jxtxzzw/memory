const sequelize = require('./index')

const MODEL_INIT_LIST = [
  'ItemCategory',
  'ItemTag',
  'Comment',
  'User',
  'Type'
]

const MODELS = []
MODELS.push(require('./models/Item').Item)
MODELS.push(require('./models/Item').Tag)
MODELS.push(require('./models/Item').Category)
MODELS.push(require('./models/Item').Rating)

for (const x of MODEL_INIT_LIST) {
  MODELS.push(require('./models/' + x))
}

async function forceSyncModels (MODELS) {
  for (const model of MODELS.reverse()) {
    await model.sync({ force: true })
  }
}

sequelize
  .authenticate()
  .then(async () => {
    await forceSyncModels(MODELS)
  })
