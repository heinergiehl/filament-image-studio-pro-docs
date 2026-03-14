# Storage

Image Studio Pro uses Laravel's filesystem abstraction, so it works with:

- local storage
- Amazon S3
- Google Cloud Storage
- other compatible cloud disks

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
