import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import * as fs from 'node:fs';
import * as path from 'node:path';

// 构建时自动扫描 static/img/showcase/ 目录，供首页轮播组件读取
function getShowcaseImages(): string[] {
  const dir = path.join(__dirname, 'static', 'img', 'showcase');
  if (!fs.existsSync(dir)) {
    return [];
  }
  const allowed = /\.(png|jpe?g|webp|gif|svg)$/i;
  return fs
    .readdirSync(dir)
    .filter((file) => allowed.test(file))
    .sort()
    .map((file) => `img/showcase/${file}`);
}
    

const config: Config = {
  title: 'Loeba 列巴工坊',
  tagline: '不止生存，更有无限可能',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://WorldmeQC.github.io',
  baseUrl: '/Loeba-Server/',

  organizationName: 'WorldmeQC',
  projectName: 'loeba-server',
  trailingSlash: false,

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  // 自定义字段：服务器信息 + 展示图，首页组件会读取这里
  customFields: {
    serverIp: 'x54.minekuai.com:13050',
    serverVersion: '26.2',
    showcaseImages: getShowcaseImages(),
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Loeba 列巴工坊',
      logo: {
        alt: 'Loeba 列巴工坊 Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: '文档',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '关于服务器',
          items: [
            {
              label: '服务器文档',
              to: '/docs/intro',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Loeba 列巴工坊. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
