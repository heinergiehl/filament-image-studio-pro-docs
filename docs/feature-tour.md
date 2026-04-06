# Feature tour

This page explains what Filament Image Studio Pro actually includes today and how the pieces fit together.

## Product structure

Image Studio Pro is centered around two Filament pages plus the embedded field and action integrations.

### Landing page

Public overview:

- https://filament-image-studio-pro.heinerdevelops.tech

Use this page when you want to understand the product, share it, or send someone to the public-facing overview first.

### Admin login

Direct Filament demo login:

- https://filament-image-studio-pro.heinerdevelops.tech/admin/login

Use this when you already want the dashboard experience. If a logged-out user opens a protected studio URL directly, Filament redirects them here first.

### Image Studio

`Image Studio` is the main editor page.

You can start from:

- a blank canvas
- a built-in preset size
- an uploaded source image
- a reusable source image from Source Library
- a saved draft
- a saved template

### Image Studio Assets

`Image Studio Assets` is the library page.

It brings the full asset workflow into one place:

- saved projects
- reusable source images
- templates
- renders
- brand presets

## Editor features

### Canvas editing

The editor supports day-to-day image production work inside Filament:

- text layers for headlines, labels, and callouts
- shape layers for overlays and emphasis
- markup tools (lines, arrows, highlights, notes, redaction) for review and feedback images
- image cropping and repositioning
- source replacement inside an existing design
- layer-based editing and reordering
- freehand drawing with pencil, circle, and spray brush types
- right-click context menu with cut, copy, paste, duplicate, delete, lock, and z-order controls
- 30+ keyboard shortcuts covering undo/redo, clipboard, selection, nudge, zoom, and z-order
- scroll-wheel zoom, pinch zoom, zoom fit/in/out buttons, and spacebar-drag panning
- per-object locking to prevent accidental edits on finalized layers

### Styling and text controls

Users can work with:

- fonts and font-family selection
- text size, weight, and alignment
- text background styling
- fill, stroke, opacity, and color styling
- reusable brand-driven defaults

### Image adjustments

The editor includes filter and adjustment support for common image work, including:

- brightness
- contrast
- saturation
- grayscale
- blur
- hue rotation
- vibrance
- noise
- pixelate
- sharpen
- sepia
- invert

### Workflow helpers

The editor is designed for real repeated usage, not one-off demos:

- autosave for draft work
- undo and redo
- snap guides for cleaner alignment
- draft preview generation
- recent project access
- recent source access

## Team workflows

Image Studio Pro includes a full team review and approval workflow for collaborative production.

### Approval workflow

Assets move through a clear review cycle separate from the draft/published/archived status:

- **Draft** — work in progress, not yet submitted
- **In Review** — submitted for review by a team member
- **Changes Requested** — reviewer asked for modifications with a required note
- **Approved** — reviewer approved the asset for use

Workflow controls appear in both the editor and the library page. Submitters and reviewers are tracked with timestamps.

When a document changes after approval, the workflow status resets back to draft automatically so stale approvals cannot persist.

### Revision history

Saved projects support immutable revision history:

- manual revision checkpoints from the editor
- automatic checkpoint creation when submitting for review
- restore any previous revision — restoring creates a new entry instead of overwriting history
- full revision list accessible from the library and editor sidebar

Revisions are append-only. You always have a reliable trail of prior states.

### Shared workspaces

Image Studio Pro supports three collaboration modes:

- **Tenant-aware** — when Filament tenancy is active, records scope to the active tenant automatically
- **User mode** (default) — each signed-in admin sees only their own drafts, templates, and brand presets
- **Panel mode** (opt-in) — admins in the same Filament panel share one studio workspace

Use panel mode when multiple admins need to collaborate on the same set of designs without Filament tenancy.

### Picker field

You can embed an Image Studio picker in any Filament form to let users select from existing assets and renders:

```php
use Heiner\FilamentCreativeStudioPro\Fields\CreativeStudioPicker;

CreativeStudioPicker::make('selected_image')
    ->label('Choose an image');
```

The picker can also be opened from rich-text editors to insert images directly into content.

### Review authorization

Review actions can optionally be gated behind a policy or Gate ability so only designated reviewers can approve or request changes.

```php
'authorization' => [
    'review_ability' => 'review-image-studio',
]
```

### Templates

Templates make repeatable production much faster.

You can:

- browse templates from the editor
- apply a template to the current work
- open a template in a new draft
- save the current design as a reusable template

### Brand presets

Brand presets are the built-in brand system for editors and admin users.

A brand preset can include:

- brand colors
- preferred fonts
- text defaults
- alignment defaults
- logo placement helpers
- logo assets

Brand presets can be used to:

- place a logo quickly
- add branded headline and callout layers
- restyle layers without rebuilding the project structure

## Library features

The library page is not just a file browser. It manages the full lifecycle around creative work.

### Projects

Projects are the saved editable drafts.

They support:

- reopening in the editor
- search and pagination
- status-based review
- separation from reusable source assets

Project states include:

- Draft
- Published
- Archived

### Source Library

Source Library stores reusable original images.

This matters because reusable sources and editable projects are not the same thing:

- a project is a working design document
- a source is a reusable original asset

Users can upload an image only for the current design or add it to Source Library for future reuse.

### Renders

Renders are exported outputs produced from a project.

The library page lets users:

- review rendered files
- inspect generated output variants
- remove renders they no longer need

### Templates and brand presets

Templates and brand presets are also managed from the library page, so non-technical users can keep reusable design systems organized without touching code.

## Built-in presets

The package currently includes these ready-to-use format presets:

- Instagram Square
- Instagram Story
- Open Graph
- Blog Hero
- Promo Banner
- YouTube Thumbnail

## Sources and browsing options

Image Studio Pro supports multiple ways to browse or bootstrap images into the editor.

### Built-in options

- indexed source provider for large cloud-backed libraries
- filesystem source provider for curated folders
- optional Spatie Media Library provider

### Why indexed browsing matters

For small local libraries, direct browsing is fine.

For larger S3, R2, or GCS-backed libraries, indexed browsing keeps search and pagination fast by reading from indexed metadata instead of scanning the bucket on every request.

## Output and export features

The editor can produce finished output in several ways.

### Render formats

The plugin supports finished render export in:

- PNG
- JPEG
- WebP

### App handoff options

The result can be sent back into your app as:

- an Image Studio asset reference
- a plain storage path
- a Spatie Media Library attachment

This makes the plugin usable both as a standalone studio and as a normal Filament field or action inside your own resources.

## Filament-specific features

Image Studio Pro is built as a real Filament package, not just a JavaScript widget.

That means it includes:

- standalone panel pages
- a Filament form field
- a Filament action helper
- Laravel package config
- install command and migrations
- storage-aware and tenancy-aware behavior

## Multitenancy and authorization

When Filament tenancy is active, Image Studio Pro automatically scopes the relevant data to the current tenant.

This includes:

- drafts
- templates
- brand presets
- indexed source queries

Access can also be controlled with config-driven abilities for:

- page access
- asset access (including creation and export)
- source access
- review access (approve and request changes)

All abilities are optional and permissive by default. Configure them when you need role-based access control:

```php
'authorization' => [
    'page_ability' => 'access-image-studio',
    'asset_ability' => 'manage-image-studio',
    'source_ability' => 'browse-image-studio-sources',
    'review_ability' => 'review-image-studio',
]
```

## Best fit

Image Studio Pro is especially useful when a team needs repeatable branded output inside the admin panel for things like:

- social content
- campaign graphics
- blog imagery
- Open Graph cards
- thumbnails
- internal review images
- reusable marketing templates
