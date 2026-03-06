# PocketBase Setup for OpenStock Lite

## A1) Install and run PocketBase

1. **Download PocketBase**
   - Go to https://pocketbase.io/docs/
   - Download the binary for your OS (macOS: `pocketbase_*_darwin_*`)
   - Or: `curl -LO https://github.com/pocketbase/pocketbase/releases/latest/download/pocketbase_darwin_arm64.zip` (adjust for your arch)
   - Unzip and place `pocketbase` in this folder

2. **Run locally**
   ```bash
   cd pocketbase
   ./pocketbase serve
   ```

3. **Open admin UI**
   - http://127.0.0.1:8090/_/
   - Create an admin account on first run

## A2) Collections (database tables)

The migrations in `pb_migrations/` create:

### 1) `items`
- `name` (text) — required
- `sku` (text) — optional
- `qty` (number) — required
- `reorderPoint` (number) — required
- `image` (file) — optional
- `owner` (relation → users) — for access rules

### 2) `adjustments` (optional)
- `item` (relation → items)
- `delta` (number)
- `note` (text)

Migrations run automatically on `serve`. If you prefer to create collections manually via the Admin UI, delete the migration files and create them there.

## A3) Access rules

The `items` collection uses:
- **list/view/update/delete**: only if `owner = @request.auth.id`
- **create**: requires auth, set `owner` to `@request.auth.id`

You can adjust rules in Admin UI → Collections → items → API rules.
