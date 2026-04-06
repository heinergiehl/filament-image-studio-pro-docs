# Integrations and storage

This guide covers how Filament Image Studio Pro connects to your app, where it stores data, and how to keep source browsing fast and predictable.

## Public access

- Product page and docs: https://filament-image-studio-pro.heinerdevelops.tech
- Public GitHub docs and release notes: https://github.com/heinergiehl/filament-image-studio-pro-docs
- Support: webdevislife2021@gmail.com

## Core integration points

Image Studio Pro integrates with Filament in three main ways:

- standalone panel pages
- form field usage
- record and table actions

## Standalone pages

The plugin registers two pages by default:

- `Image Studio`
- `Image Studio Assets`

These pages are useful when you want a dedicated creative workflow inside the admin panel.

## Form field integration

Use the field when the studio should behave like part of a form flow.

```php
use Heiner\FilamentCreativeStudioPro\Fields\CreativeStudioEditor;

CreativeStudioEditor::make('hero_image')
    ->label('Hero image')
    ->storeAsStoragePath('public', 'app-images/heroes');
```

Available output patterns include:

- `storeAsAssetReference()`
- `storeAsStoragePath($disk, $directory)`
- `storeInMediaLibrary($collection, $disk)`
- `outputTarget('spatie-media-library')` for advanced custom setups

## Action integration

Use the action when you want to launch the studio from an existing record, resource page, or table row.

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

## CSS hooks

Public wrapper hooks use Filament's `fi-` convention:

- `.fi-creative-studio`
- `.fi-creative-studio-field`

That makes host-app overrides predictable and keeps plugin styling aligned with the rest of the Filament ecosystem.

## Output targets

The plugin supports three main handoff styles.

### Asset reference

Stores a linked Image Studio asset identifier.

Use this when:

- you want to reopen the same draft later
- you want the app to stay linked to the studio-managed asset lifecycle
- you want Image Studio Pro to remain the source of truth

### Storage path

Stores the finished render on a disk and returns the path.

Use this when:

- your app already expects plain file paths
- you want generated image output in a normal Laravel storage location
- you do not need Media Library-specific behavior

### Spatie Media Library

Attaches the finished render to Media Library.

Use this when:

- your app already uses Spatie Media Library heavily
- records should receive the studio output as standard media items
- editors should stay inside the same Media Library workflow they already know

## Source providers

Image Studio Pro supports multiple source providers so teams can pull images from the right place.

### Indexed provider

Best for larger cloud-backed libraries.

Use it when:

- the source library lives on S3, R2, GCS, or similar storage
- the library is too large for direct folder scanning on every request
- you want fast search and pagination

Build or refresh the index with:

```bash
php artisan creative-studio:index-sources --prune
```

### Filesystem provider

Best for curated folders and smaller libraries.

Use it when:

- you want a simple folder browser
- you can point the plugin to a small, intentional directory
- you are not browsing a huge shared bucket root

### Spatie Media Library provider

Best when reusable source images already live in Media Library.

Use it when:

- your app already has curated Media Library collections
- editors should browse existing media instead of maintaining a second source system

## Storage model

Image Studio Pro separates working data and file storage cleanly.

### Database-backed data

The database stores things like:

- drafts and project metadata
- templates
- brand presets
- render metadata
- indexed source metadata

### Filesystem-backed media

Storage disks handle things like:

- uploaded source images
- preview files
- exported renders
- template previews
- brand logos

## Recommended environment setup

Most installs should stay simple.

If the plugin should follow the app-wide disk:

```dotenv
FILESYSTEM_DISK=public
```

If only the plugin should use a different disk:

```dotenv
FILAMENT_CREATIVE_STUDIO_DISK=s3
LIVEWIRE_TEMPORARY_FILE_UPLOAD_DISK=local
```

Only reach for these if you intentionally want split-disk behavior:

```dotenv
FILAMENT_CREATIVE_STUDIO_OUTPUT_DISK=s3
FILAMENT_CREATIVE_STUDIO_PREVIEW_DISK=s3
```

## Why Livewire temp uploads should stay local

Even when final files live on S3 or GCS, Livewire temporary uploads are usually easiest and safest on a local disk.

That avoids common browser-to-bucket CORS issues during admin uploads.

Recommended setting:

```dotenv
LIVEWIRE_TEMPORARY_FILE_UPLOAD_DISK=local
```

## Private cloud storage support

For private object storage, the plugin supports:

- temporary signed preview URLs
- same-origin preview proxy behavior
- cloud-friendly preview loading for S3, GCS, R2, and similar drivers

This matters because canvas-based editors can fail when images are loaded from the wrong cross-origin setup.

## Multitenancy

When Filament tenancy is active, the plugin scopes tenant-owned data automatically.

That includes:

- drafts
- templates
- brand presets
- tenant-scoped source index items

Single-tenant apps do not need extra setup.

### Workspace modes for non-tenant apps

Apps without Filament tenancy can choose between two scoping modes:

- **User mode** (default): each signed-in admin sees only their own drafts, templates, and brand presets. This matches the original behavior.
- **Panel mode**: all admins in the same Filament panel share one workspace. Enable it for team collaboration without tenancy.

```dotenv
FILAMENT_CREATIVE_STUDIO_NON_TENANT_SCOPE=panel
```

Existing records from older versions remain visible after upgrading to panel mode.

## Authorization

Image Studio Pro supports four config-driven authorization abilities. All are optional and permissive by default — when an ability is not configured, all authenticated panel users have access.

```php
// config/filament-image-studio-pro.php
'authorization' => [
    'page_ability' => null,          // Gate for accessing the studio pages
    'asset_ability' => null,         // Gate for creating, editing, and exporting assets
    'source_ability' => null,        // Gate for browsing source images
    'review_ability' => null,        // Gate for approving or requesting changes
],
```

### Page access

Set `page_ability` to control who can see the Image Studio and Image Studio Assets pages in the panel navigation.

### Asset access

Set `asset_ability` to control who can create new designs, edit existing ones, and export renders. The Gate receives the asset model (or the class for creation).

### Source access

Set `source_ability` to control who can browse and load source images. The Gate receives the disk name and path as parameters.

### Review access

Set `review_ability` to control who can approve assets or request changes. The Gate receives the asset model. Users without this ability can still submit their own work for review — they just cannot approve or reject.

Example setup with Laravel Gates:

```php
// In a service provider
Gate::define('review-image-studio', function ($user) {
    return $user->hasRole('reviewer') || $user->hasRole('admin');
});

Gate::define('manage-image-studio', function ($user, $asset = null) {
    return $user->hasRole('editor') || $user->hasRole('admin');
});
```

```php
// config/filament-image-studio-pro.php
'authorization' => [
    'asset_ability' => 'manage-image-studio',
    'review_ability' => 'review-image-studio',
],
```

### Preview file security

Preview files are served through a signed route that validates an HMAC signature. The controller additionally enforces a disk allowlist derived from the plugin’s configured disks, so preview requests cannot access arbitrary storage locations.

## Custom providers and outputs

If the built-in source providers or output targets are not enough, you can register custom ones from your app.

Typical examples:

- a custom DAM or asset provider
- a DB-indexed enterprise media source
- a custom output destination for app-specific publishing flows

## Practical recommendations

### Keep it simple first

A good first production rollout usually looks like this:

1. one disk
2. a curated source library folder
3. a few brand presets
4. one or two output targets

### Add indexed browsing when scale requires it

If the library grows large or moves to cloud storage, turn on indexed browsing and schedule reindexing as needed.

### Avoid giant bucket roots

Point the filesystem provider at intentional folders such as `creative-studio/library` or `marketing-assets`, not the root of a huge shared bucket.
