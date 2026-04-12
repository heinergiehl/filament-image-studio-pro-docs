# Getting started with Filament Image Studio Pro

This guide walks through the fastest path from installation to your first usable image workflow inside Filament.

## Live demo

If you want to see the product before installing it, use the live demo:

- Landing page: https://filament-image-studio-pro.heinerdevelops.tech
- Admin login: https://filament-image-studio-pro.heinerdevelops.tech/admin/login

The landing page is the public overview. The admin login takes you straight to the Filament dashboard demo.

## Purchase and support

- Product page and public docs: https://filament-image-studio-pro.heinerdevelops.tech
- Public GitHub docs and release notes: https://github.com/heinergiehl/filament-image-studio-pro-docs
- Support: webdevislife2021@gmail.com

## Current requirements

- PHP 8.2+
- Laravel 12.x
- Filament 5.x
- Livewire 4

## Install the package

1. Purchase Image Studio Pro.
2. Apply the Composer repository or authentication details from your purchase instructions.
3. Install the package:

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

- `Image Studio` - the editor page where users build and export designs
- `Image Studio Assets` - the library page for projects, reusable sources, templates, renders, and brand presets

By default both pages are registered in your panel navigation.

## CSS hooks

Public wrapper hooks use Filament's `fi-` prefix:

- `.fi-creative-studio`
- `.fi-creative-studio-field`

Use those wrappers for host-app overrides instead of targeting internal panel markup.

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

## Workspace modes

Image Studio supports three collaboration modes out of the box:

- **Tenant-aware**: when Filament tenancy is active, records scope to the active tenant automatically. No extra setup needed.
- **User mode** (default): each signed-in admin sees only their own drafts. This matches the pre-1.2 behavior.
- **Panel mode** (opt-in): admins in the same Filament panel share one studio workspace.

Switch to panel mode for shared team collaboration without Filament tenancy:

```dotenv
FILAMENT_CREATIVE_STUDIO_NON_TENANT_SCOPE=panel
```

## Setting up reviews and approvals

The approval workflow is available out of the box after running the latest migrations.

Projects can move through: `draft → in_review → changes_requested → approved`.

To restrict who can approve or request changes, define a Gate and set the config:

```php
// AppServiceProvider or AuthServiceProvider
Gate::define('review-image-studio', function ($user) {
    return $user->hasRole('reviewer'); // your own logic
});
```

```php
// config/filament-image-studio-pro.php
'authorization' => [
    'review_ability' => 'review-image-studio',
],
```

When no ability is configured, all authenticated panel users can review. Configure the ability when you need role separation between creators and reviewers.

## Setting up the picker field

You can let users select from existing Image Studio assets in any Filament form:

```php
use Heiner\FilamentCreativeStudioPro\Fields\CreativeStudioPicker;

CreativeStudioPicker::make('selected_image')
    ->label('Choose an existing design');
```

The picker shows approved and draft assets with search and pagination.

## Using viewer actions

Three lightweight actions let you view and browse images without opening the editor.

### ViewImageAction

Opens a single image in a pan/zoom slide-over. Use it on table rows, resource pages, or anywhere you need quick image inspection.

```php
use Heiner\FilamentCreativeStudioPro\Actions\ViewImageAction;

ViewImageAction::make()
    ->imageUrl(fn ($record) => $record->cover_url)
    ->imageAlt(fn ($record) => $record->title);
```

### OpenMediaAction

Opens a gallery modal for browsing a set of images. Users can pan/zoom individual items and optionally select one or more.

```php
use Heiner\FilamentCreativeStudioPro\Actions\OpenMediaAction;

OpenMediaAction::make()
    ->media([
        ['src' => 'https://example.com/photo1.jpg', 'alt' => 'Photo 1'],
        ['src' => 'https://example.com/photo2.jpg', 'alt' => 'Photo 2'],
    ])
    ->multiple()
    ->onSelect(function (array $selected): void {
        // $selected is a list of chosen media items
    });
```

## Using viewer Livewire components

Three Livewire components ship with the package for embedding viewers directly in Blade views or Filament pages.

### PanZoomViewer

```blade
<livewire:filament-image-studio-pro::pan-zoom-viewer
    src="https://example.com/image.jpg"
    alt="Product photo"
/>
```

Supports optional `zoom`, `min-zoom`, and `max-zoom` props. Zoom controls and a reset button are included.

### GalleryViewer

```blade
<livewire:filament-image-studio-pro::gallery-viewer
    :media="[
        ['src' => '/photos/1.jpg', 'thumb' => '/photos/1-thumb.jpg', 'alt' => 'First', 'caption' => null],
        ['src' => '/photos/2.jpg', 'thumb' => '/photos/2-thumb.jpg', 'alt' => 'Second', 'caption' => 'A caption'],
    ]"
    :columns="3"
/>
```

Lightbox mode is enabled by default. Keyboard navigation (arrow keys, Escape) works in the lightbox.

### ImageCompare

```blade
<livewire:filament-image-studio-pro::image-compare
    before="https://example.com/before.jpg"
    after="https://example.com/after.jpg"
    before-label="Original"
    after-label="Edited"
    :initial-position="40"
/>
```

The divider is draggable. `initial-position` sets the starting split as a percentage (0–100).

## Next steps

- Read [feature-tour.md](feature-tour.md) for a full feature breakdown.
- Read [integrations-and-storage.md](integrations-and-storage.md) for sources, outputs, storage, tenancy, and production advice.

If you have a cool idea for a feature or an improvement, I'd genuinely love to hear it. Suggestions for workflows, integrations, UI polish, and quality-of-life improvements are always welcome.

If you run into a bug, have a question, or just want to share an idea, feel free to email me at webdevislife2021@gmail.com.

I'm continuously improving Image Studio Pro and regularly publishing new versions to make it better over time.
