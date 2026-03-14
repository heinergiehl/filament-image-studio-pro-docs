# Troubleshooting

## Upload works, but Source Library feels slow

Use the indexed provider for larger cloud libraries:

```bash
php artisan creative-studio:index-sources --prune
```

## Browser upload fails on S3

Keep Livewire temporary uploads local:

```dotenv
LIVEWIRE_TEMPORARY_FILE_UPLOAD_DISK=local
```

## Canvas export says the canvas is tainted

Use the plugin's same-origin preview proxy and keep preview URLs on the configured plugin disk.

## Search finds nothing

Check:

- the correct Source Library provider is active
- the files are actually in the configured library directory
- the index has been built if using indexed cloud browsing
