import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'React Autocomplete',
  tagline: 'A modular, lightweight, and headless solution',
  favicon: 'img/favicon.ico',
  url: 'https://szhsin.github.io',
  baseUrl: '/react-autocomplete/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'szhsin', // Usually your GitHub org/user name.
  projectName: 'react-autocomplete', // Usually your repo name.

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en']
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/szhsin/react-autocomplete/tree/master/website/'
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css'
        }
      } satisfies Preset.Options
    ]
  ],

  themeConfig: {
    navbar: {
      title: 'React Autocomplete',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs'
        },
        {
          href: 'https://github.com/szhsin/react-autocomplete',
          label: 'GitHub',
          position: 'right'
        }
      ]
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.vsDark,
      additionalLanguages: ['bash']
    },
    colorMode: {
      defaultMode: 'dark'
    }
  } satisfies Preset.ThemeConfig
};

export default config;
