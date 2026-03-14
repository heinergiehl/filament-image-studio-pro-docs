import { defineConfig } from 'vitepress';

export default defineConfig({
    title: 'Image Studio Pro',
    description: 'Image editing, source library, layouts, and exports for Filament.',
    cleanUrls: true,
    themeConfig: {
        nav: [
            { text: 'Docs', link: '/' },
            { text: 'Install', link: '/installation' },
            { text: 'Storage', link: '/storage' },
        ],
        sidebar: [
            {
                text: 'Getting Started',
                items: [
                    { text: 'Overview', link: '/' },
                    { text: 'Installation', link: '/installation' },
                    { text: 'Storage', link: '/storage' },
                ],
            },
            {
                text: 'Using The Plugin',
                items: [
                    { text: 'Editor', link: '/editor' },
                    { text: 'Source Library', link: '/source-library' },
                    { text: 'Layouts', link: '/layouts' },
                    { text: 'Troubleshooting', link: '/troubleshooting' },
                ],
            },
        ],
        socialLinks: [],
    },
});
