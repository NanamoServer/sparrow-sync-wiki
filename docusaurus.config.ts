import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Sparrow Sync',

  favicon: 'img/sparrow-sync-logo.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
    // Use the faster toolchain (Rspack + SWC + Lightning CSS + MDX-rs)
    // provided by the installed @docusaurus/faster package.
    faster: true,
  },

  // Set the production url of your site here
  url: 'https://nanamoserver.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/sparrow-sync-wiki/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'NanamoServer', // Usually your GitHub org/user name.
  projectName: 'sparrow-sync-wiki', // Usually your repo name.

  onBrokenLinks: 'throw',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    }
  },

  // Reapply saved theme preferences BEFORE first paint so the navbar/active
  // states don't flash defaults on reload. The pickers (initSidebarToolbar)
  // own these attributes thereafter; this only sets them early. Runs in
  // <head>, before React mounts.
  headTags: [
    {
      tagName: 'script',
      attributes: {},
      innerHTML: `
      try {
        const themeColor = localStorage.getItem('theme-color');
        if (themeColor) {
          document.documentElement.setAttribute('data-theme-color', themeColor);
        }
      } catch (_) {}
      try {
        const eyeCare = localStorage.getItem('eyecare');
        if (eyeCare) {
          document.documentElement.setAttribute('data-eyecare', eyeCare);
        }
      } catch (_) {}
      `,
    },
  ],

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-Hans'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
          editUrl: 'https://github.com/NanamoServer/sparrow-sync-wiki/edit/main/',
          editLocalizedFiles: true,
          // Disabled until the repo has its first commit: with these on,
          // `docusaurus build` runs `git log` eagerly and hard-fails on a
          // repository with zero commits. Re-enable both after committing.
          showLastUpdateTime: false,
          showLastUpdateAuthor: false,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'Sparrow Sync',
      logo: {
        src: 'img/sparrow-sync-logo.png',
        width: 32,
        height: 32,
      },
      items: [
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/NanamoServer/sparrow-sync',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['java', 'groovy', 'kotlin'],
    },
    colorMode: {
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    zoom: {
      selector: '.markdown img',
      background: {
        light: 'rgba(255,255,255,0.8)',
        dark: 'rgba(36,36,36,0.8)',
      },
    },
  } satisfies Preset.ThemeConfig,

  plugins: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      ({
        hashed: true,
        language: ["en", "zh"],
        searchBarShortcutKeymap: "ctrl+shift+f",
        docsRouteBasePath: "/",
      }),
    ],
    'docusaurus-plugin-image-zoom',
  ],
};

export default config;
