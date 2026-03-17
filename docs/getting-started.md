# Getting started with Filament Image Studio Pro

This guide walks through the fastest path from installation to your first usable image workflow inside Filament.

## Live demo

If you want to see the product before installing it, use the live demo:

- Landing page: https://filament-image-studio-pro.heinerdevelops.tech
- Admin login: https://filament-image-studio-pro.heinerdevelops.tech/admin/login

The landing page is the public overview. The admin login takes you straight to the Filament dashboard demo.

## Requirements

- PHP 8.3+
- Laravel 12.x
- Filament 5.x
- Livewire 4

## Install the package

```bash
composer require heiner/filament-image-studio-pro
php artisan creative-studio:install
php artisan migrate
php artisan filament:assets
```

## Register the plugin

Add the plugin to your Filament panel provider:

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

## What gets added to your panel

After registration, the plugin adds two main pages:

- `Image Studio` — the editor page where users build and export designs
- `Image Studio Assets` — the library page for projects, reusable sources, templates, renders, and brand presets

By default both pages are registered in your panel navigation.

## Your first working setup

A simple local setup usually only needs Laravel's normal filesystem disk:

```dotenv
FILESYSTEM_DISK=public
```

If only Image Studio Pro should use a different disk, set this instead:

```dotenv
FILAMENT_CREATIVE_STUDIO_DISK=s3
LIVEWIRE_TEMPORARY_FILE_UPLOAD_DISK=local
```

Keep Livewire temporary uploads local unless you have intentionally configured direct browser-to-bucket uploads.

## First workflow

### 1. Prepare reusable assets

Open `Image Studio Assets` first when you want to:

- upload reusable source images into Source Library
- create brand presets for your team
- review saved templates
- reopen past projects or renders

### 2. Open the editor

Open `Image Studio` when you want to:

- start a blank canvas
- start from a preset size such as Instagram Story or Open Graph
- load a source image into a new draft
- reopen an existing draft
- apply a saved template

### 3. Build the design

Inside the editor, users can:

- crop and position the main image
- add text blocks, callouts, and shape overlays
- apply filters and styling
- use brand presets for fonts, colors, and logos
- save reusable templates for future work
- export final render variants

### 4. Save or hand off the result

A design can end in a few different ways:

- keep it as an editable saved draft
- export a finished render file
- send the result back into a Filament form
- store the render on a disk path
- attach the render to Spatie Media Library

## Using Image Studio inside forms

The built-in field opens the studio and returns the chosen output directly to your form.

```php
use Heiner\FilamentCreativeStudioPro\Fields\CreativeStudioEditor;

CreativeStudioEditor::make('hero_image')
    ->label('Hero image')
    ->storeAsStoragePath('public', 'app-images/heroes');
```

Common output modes:

- `storeAsAssetReference()` keeps a linked studio asset ID
- `storeAsStoragePath($disk, $directory)` stores the chosen render and returns the path
- `storeInMediaLibrary($collection, $disk)` attaches the final render to Media Library

## Using Image Studio from actions

Use the action helper when you want to launch the editor from a table action, resource action, or existing record workflow.

```php
use Heiner\FilamentCreativeStudioPro\Actions\EditInImageStudioAction;

EditInImageStudioAction::make()
    ->storeRenderInAttribute('hero_image', 'public', 'app-images/heroes');
```

For Media Library-backed records:

```php
EditInImageStudioAction::make()
    ->attachRenderToMediaLibrary('hero-images');
```

## Practical rollout advice

Start simple:

1. Use one disk.
2. Add a few brand presets.
3. Upload a curated source library instead of pointing at a huge bucket root.
4. Add indexed browsing later if your shared library becomes large.

## Next steps

- Read [feature-tour.md](feature-tour.md) for a full feature breakdown.
- Read [integrations-and-storage.md](integrations-and-storage.md) for sources, outputs, storage, tenancy, and production advice.
