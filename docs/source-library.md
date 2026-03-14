# Source Library

Source Library is the reusable image catalog.

It is separate from saved designs on purpose:

- `Designs` are editable working documents
- `Source Library` items are reusable originals

## Automatic indexing

Images uploaded through `Add to Source Library` are indexed automatically by the plugin.

## Manual indexing

Run indexing when:

- you already have files in the bucket before installing the plugin
- files are added outside the plugin
- you want faster search and pagination on large cloud libraries

```bash
php artisan creative-studio:index-sources --prune
```
