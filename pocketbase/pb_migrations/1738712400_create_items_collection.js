migrate((app) => {
  const usersCollection = app.findCollectionByNameOrId('users')
  const collection = new Collection({
    type: 'base',
    name: 'items',
    listRule: 'owner = @request.auth.id',
    viewRule: 'owner = @request.auth.id',
    createRule: '@request.auth.id != ""',
    updateRule: 'owner = @request.auth.id',
    deleteRule: 'owner = @request.auth.id',
    fields: [
      { type: 'text', name: 'name', required: true },
      { type: 'text', name: 'sku', required: false },
      { type: 'number', name: 'qty', required: true },
      { type: 'number', name: 'reorderPoint', required: true },
      { type: 'file', name: 'image', required: false, maxSelect: 1, maxSize: 5242880 },
      {
        type: 'relation',
        name: 'owner',
        required: true,
        maxSelect: 1,
        collectionId: usersCollection.id,
      },
    ],
  })
  app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId('items')
  app.delete(collection)
})
