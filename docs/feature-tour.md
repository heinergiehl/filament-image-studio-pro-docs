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
- annotation tools for review and feedback images
- image cropping and repositioning
- source replacement inside an existing design
- layer-based editing and reordering

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

### Workflow helpers

The editor is designed for real repeated usage, not one-off demos:

- autosave for draft work
- undo and redo
- snap guides for cleaner alignment
- draft preview generation
- recent project access
- recent source access

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
- asset access
- source access

## Best fit

Image Studio Pro is especially useful when a team needs repeatable branded output inside the admin panel for things like:

- social content
- campaign graphics
- blog imagery
- Open Graph cards
- thumbnails
- internal review images
- reusable marketing templates
