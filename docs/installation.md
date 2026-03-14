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

## First production check

Make sure uploads, save, export, and Source Library browsing work in your target storage setup before launch.
