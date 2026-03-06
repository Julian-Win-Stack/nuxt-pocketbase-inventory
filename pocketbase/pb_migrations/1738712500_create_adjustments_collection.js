migrate((app) => {
  const itemsCollection = app.findCollectionByNameOrId('items')
  const collection = new Collection({
    type: 'base',
    name: 'adjustments',
    listRule: null,
    viewRule: null,
    createRule: null,
    updateRule: null,
    deleteRule: null,
    fields: [
      {
        type: 'relation',
        name: 'item',
        required: true,
        maxSelect: 1,
        collectionId: itemsCollection.id,
      },
      { type: 'number', name: 'delta', required: true },
      { type: 'text', name: 'note', required: false },
    ],
  })
  app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId('adjustments')
  app.delete(collection)
})
