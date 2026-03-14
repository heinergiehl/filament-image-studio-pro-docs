# Installation

## Requirements

- PHP 8.3+
- Laravel 12
- Filament 5
- Livewire 4

## Install the package

```bash
composer require heiner/filament-image-studio-pro
php artisan creative-studio:install
php artisan migrate
php artisan filament:assets
```

## Register the plugin

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

Most installs should use one of these two simple models.

If the whole app should use the same disk:

```dotenv
FILESYSTEM_DISK=public
```

If only Image Studio Pro should use a cloud disk:

```dotenv
FILAMENT_CREATIVE_STUDIO_DISK=s3
LIVEWIRE_TEMPORARY_FILE_UPLOAD_DISK=local
```

For cloud-backed apps, keep Livewire temporary uploads local unless you have
explicitly configured direct browser-to-bucket uploads.

## First production check

Make sure uploads, save, export, and Source Library browsing work in your target storage setup before launch.
