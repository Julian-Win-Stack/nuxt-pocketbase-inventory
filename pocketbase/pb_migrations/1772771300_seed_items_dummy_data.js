/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const itemsCollection = app.findCollectionByNameOrId('items')
  const usersCollection = app.findCollectionByNameOrId('users')

  // Get first user for owner, or create test user if none exist
  let ownerRecord
  try {
    const users = app.findRecordsByFilter('users', '', '', 1, 0)
    if (users.length > 0) {
      ownerRecord = users[0]
    }
  } catch (_) {}

  if (!ownerRecord) {
    try {
      ownerRecord = app.findAuthRecordByEmail('users', 'test@example.com')
    } catch (_) {
      ownerRecord = new Record(usersCollection)
      ownerRecord.set('email', 'test@example.com')
      ownerRecord.set('password', '1234567890')
      app.save(ownerRecord)
    }
  }

  const ownerId = ownerRecord.id

  const dummyItems = [
    { name: 'Widget A', sku: 'WDG-001', qty: 50, reorderPoint: 10 },
    { name: 'Gadget B', sku: 'GDG-002', qty: 25, reorderPoint: 15 },
    { name: 'Tool C', sku: 'TOL-003', qty: 8, reorderPoint: 5 },
    { name: 'Part D', sku: 'PRT-004', qty: 100, reorderPoint: 20 },
    { name: 'Supply E', sku: 'SPL-005', qty: 3, reorderPoint: 10 },
  ]

  for (const item of dummyItems) {
    const record = new Record(itemsCollection)
    record.set('name', item.name)
    record.set('sku', item.sku)
    record.set('qty', item.qty)
    record.set('reorderPoint', item.reorderPoint)
    record.set('owner', ownerId)
    app.save(record)
  }
}, (app) => {
  // Down: delete seeded items by name
  const names = ['Widget A', 'Gadget B', 'Tool C', 'Part D', 'Supply E']
  for (const name of names) {
    try {
      const record = app.findFirstRecordByData('items', 'name', name)
      app.delete(record)
    } catch (_) {}
  }
})
