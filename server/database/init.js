const sequelize = require('./index')

const MODEL_INIT_LIST = [
  'ItemCategory',
  'ItemTag',
  'Comment',
  'Relations',
  'Tag',
  'Category',
  'Item',
  'Rating',
  'User',
  'Type'
]

const MODELS = []

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
