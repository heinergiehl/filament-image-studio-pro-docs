# Source Library

Source Library is the reusable image catalog.

It is separate from saved designs on purpose:

- `Designs` are editable working documents
- `Source Library` items are reusable originals

## What gets added automatically

Images uploaded through `Add to Source Library` are:

- stored on the configured plugin disk
- indexed automatically
- immediately browseable from Source Library

`Design only` uploads do not appear there by default, which is intentional.

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

In simple terms, that command scans storage and refreshes the searchable Source
Library catalog in your app database.

## Best practice for cloud storage

- small/local installs: direct browsing is fine
- larger S3/GCS libraries: prefer the indexed provider for faster search and pagination
