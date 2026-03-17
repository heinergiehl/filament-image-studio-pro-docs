# Filament Image Studio Pro

Filament Image Studio Pro is a premium Filament plugin for teams that need to create branded, publish-ready images without leaving the admin panel.

It is built for real production work inside Filament: reusable source images, editable projects, templates, brand presets, exports, and direct handoff back into your app.

## Live demo

- Landing page: https://filament-image-studio-pro.heinerdevelops.tech
- Admin login: https://filament-image-studio-pro.heinerdevelops.tech/admin/login

Use the landing page when you want the public product overview. Use the admin login when you want to go straight into the Filament dashboard demo.

If you open a protected studio route while logged out, Filament redirects you to the admin login screen first.

## What Image Studio Pro does

Image Studio Pro adds a complete image workflow to Filament:

- create image drafts from uploads, presets, templates, or reusable sources
- edit images on a canvas with text, shapes, annotations, filters, cropping, and layers
- save reusable templates for repeatable output
- create brand presets with colors, fonts, text defaults, and logos
- manage reusable source images in a Source Library
- export renders as PNG, JPEG, or WebP
- send the finished result back into a Filament form, record attribute, storage path, or Media Library

## Feature summary

### Editor

- start from a blank canvas, an uploaded image, a template, a saved project, or a preset size
- crop and reposition images directly on the canvas
- add text layers, callouts, logos, and shape overlays
- annotate screenshots or marketing images with quick markup tools
- apply image adjustments such as brightness, contrast, saturation, blur, and grayscale
- reorder layers, replace sources, and keep working from saved drafts
- use undo / redo, snap guides, autosave, and draft previews while editing

### Library

- browse saved projects, reusable source images, templates, renders, and brand presets from one place
- search and paginate large libraries
- track project state with draft, published, and archived statuses
- keep reusable source images separate from working design drafts

### Templates and brand presets

- save reusable templates from the editor
- reopen templates from the editor or the library page
- create brand presets with colors, fonts, alignment defaults, logo assets, and text styling
- apply brand presets to new layers or restyle existing text quickly

### Filament integration

- standalone `Image Studio` page for editing
- standalone `Image Studio Assets` page for managing projects and reusable assets
- Filament form field integration for opening the studio from forms
- Filament action integration for editing existing records in the studio
- output targets for asset references, plain storage paths, and Spatie Media Library

### Storage and source support

- Laravel filesystem support for local disks, S3, GCS, R2, MinIO, and compatible storage
- curated filesystem browsing for smaller libraries
- indexed source browsing for larger cloud-backed libraries
- optional Spatie Media Library source browsing and output support
- signed preview URLs and same-origin preview proxy support for private cloud storage

### Multitenancy and access control

- automatic tenant scoping when Filament tenancy is active
- configurable access hooks for page access, asset access, and source access

## Built-in presets

The package ships with ready-to-use canvas presets for common marketing formats:

- Instagram Square
- Instagram Story
- Open Graph
- Blog Hero
- Promo Banner
- YouTube Thumbnail

## Documentation

- [Getting started](docs/getting-started.md)
- [Feature tour](docs/feature-tour.md)
- [Integrations and storage](docs/integrations-and-storage.md)

## Requirements

- PHP 8.3+
- Laravel 12.x
- Filament 5.x
- Livewire 4

## Installation

```bash
composer require heiner/filament-image-studio-pro
php artisan creative-studio:install
php artisan migrate
php artisan filament:assets
```

Register the plugin in your Filament panel:

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

## Quick first workflow

1. Install the plugin and register it in your Filament panel.
2. Open `Image Studio Assets` to upload reusable sources, create brand presets, and review templates.
3. Open `Image Studio` to start a blank design, open a saved project, load a template, or begin from a source image.
4. Save the draft, export one or more render variants, or send the result back into your app.

## When to use it

Image Studio Pro is a strong fit when your team regularly creates:

- social media graphics
- blog hero images
- Open Graph cards
- promo banners
- YouTube thumbnails
- internal review and annotation images
- reusable branded image templates for editors or admin staff

## Need deeper setup details?

Start with [docs/getting-started.md](docs/getting-started.md), then move to [docs/integrations-and-storage.md](docs/integrations-and-storage.md) if you need custom source providers, cloud storage, or app output configuration.

## Feedback welcome

If you have a cool idea for improving Image Studio Pro, I'd be very happy to hear it. Suggestions for workflows, integrations, UI polish, and quality-of-life improvements are always welcome.

If you run into a bug, please send it my way as well. I'll keep working to continuously improve the plugin and publish new versions to make it better over time.
