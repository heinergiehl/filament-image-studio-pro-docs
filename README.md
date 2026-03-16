# Image Studio Pro

Image Studio Pro adds a full image-production workflow to Filament:

- edit image-based designs inside your panel
- manage reusable source images in a Source Library
- save reusable layouts for repeatable output
- export rendered output back into your app storage or Media Library

Use Image Studio Pro when your team needs repeatable image production inside Filament instead of a separate external design tool.

## Typical workflow

1. choose a source image or start blank
2. apply a reusable layout if needed
3. edit text, shapes, markup, and placement
4. save the design or export a finished render

## Requirements

- PHP 8.3+
- Laravel 12
- Filament 5
- Livewire 4

## Installation

```bash
composer require heiner/filament-image-studio-pro
php artisan creative-studio:install
php artisan migrate
php artisan filament:assets
```

### Register the plugin

```php
use Filament\Panel;
use Heiner\FilamentCreativeStudioPro\CreativeStudioPlugin;

public function panel(Panel $panel): Panel
{
    return $panel
        ->plugins([
            CreativeStudioPlugin::make(),
        ]);
}
```

## Storage setup

Image Studio Pro uses Laravel's filesystem abstraction, so it works with local storage, Amazon S3, Google Cloud Storage, or other compatible cloud disks.

Most installs should use one of these two simple models.

If the whole app should use the same disk:

```dotenv
FILESYSTEM_DISK=public
```

If only Image Studio Pro should use a cloud disk (e.g., S3):

```dotenv
FILAMENT_CREATIVE_STUDIO_DISK=s3
LIVEWIRE_TEMPORARY_FILE_UPLOAD_DISK=local
```

> **Note:** For cloud-backed apps, keep Livewire temporary uploads local (`LIVEWIRE_TEMPORARY_FILE_UPLOAD_DISK=local`) unless you have explicitly configured direct browser-to-bucket uploads. The plugin can still store final source images, previews, and exports on S3 or GCS.

### Indexed Source Browsing
Images uploaded through `Add to Source Library` are indexed automatically. For larger, pre-existing cloud libraries or files added outside the plugin, build the Source Library index via command:

```bash
php artisan creative-studio:index-sources --prune
```

## Core concepts

- **Designs**: saved working documents
- **Source Library**: reusable original images
- **Layouts**: reusable text and overlay structure
- **Exports**: rendered output files

### Design Only vs. Source Library
- `Design only` upload: use the image in the current design only.
- `Add to Source Library`: keep the original reusable for future designs.

## Modules

### Editor
The editor keeps source changes in one place. Use the media rail to upload or browse the Source Library, or the `Designs` sidebar to change the current source or reopen recent work. 
- **Snaplines**: Hold `Ctrl` / `Cmd` while dragging to lock the selected layer onto nearby guides.
- **Undo / redo**: Available directly on the stage header.
- **Exports**: Exports stay full-size even when the editor canvas is shown at a reduced preview scale.

### Source Library
Source Library is the reusable image catalog. It is separate from saved designs on purpose.
- `Designs` are editable working documents
- `Source Library` items are reusable originals

### Layouts
Layouts define structure (e.g., headline position, CTA position, logo placement) for repeatable output. Source images define content. Style presets are optional visual helpers.

## Troubleshooting

- **Upload works, but Source Library feels slow on cloud storage:** Run `php artisan creative-studio:index-sources --prune` to use the indexed provider.
- **Browser upload fails on S3:** Keep Livewire temporary uploads local via `.env`.
- **Uploaded image is not in Source Library:** Ensure you used `Add to Source Library` instead of `Design only`. If added externally, run the index-sources command.
- **Canvas export says the canvas is tainted:** Use the plugin's same-origin preview proxy and keep preview URLs on the configured plugin disk.
- **Search finds nothing:** Check that the correct Source Library provider is active, files exist in the configured library directory, and the index has been built.
