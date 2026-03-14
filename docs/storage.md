# Storage

Image Studio Pro uses Laravel's filesystem abstraction, so it works with:

- local storage
- Amazon S3
- Google Cloud Storage
- other compatible cloud disks

The plugin has been exercised against real S3 and GCS buckets using Laravel
disks, not just local fake storage.

## Simple setup

If the whole app should use the same disk:

```dotenv
FILESYSTEM_DISK=s3
LIVEWIRE_TEMPORARY_FILE_UPLOAD_DISK=local
```

If only Image Studio Pro should use the cloud disk:

```dotenv
FILAMENT_CREATIVE_STUDIO_DISK=gcs
LIVEWIRE_TEMPORARY_FILE_UPLOAD_DISK=local
```

Outputs and previews inherit from `FILAMENT_CREATIVE_STUDIO_DISK` unless you explicitly override them.

## Why `LIVEWIRE_TEMPORARY_FILE_UPLOAD_DISK=local` matters

Livewire temporary uploads should stay local for the cleanest browser upload UX. The plugin can still store final source images, previews, and exports on S3 or GCS.

## Indexed source browsing

For larger cloud libraries, build the Source Library index:

```bash
php artisan creative-studio:index-sources --prune
```

This scans storage and stores searchable metadata in the app database so the Source Library does not need to browse a large bucket directly on every request.

### What that command really does

- storage keeps the actual files
- your database keeps the searchable catalog
- the command syncs storage into that catalog

If users only add images through `Add to Source Library`, those items are
indexed automatically. The command matters mainly for pre-existing files or
files added outside the plugin.
