// @ts-check

const {colord} = require(`colord`);
const fs = require(`fs`);
const lightCodeTheme = require(`prism-react-renderer/themes/vsDark`);
const darkCodeTheme = require(`prism-react-renderer/themes/vsDark`);
const {parse: parseFont} = require(`opentype.js`);
const path = require(`path`);

const docProjectCwd = process.env.DOC_PROJECT_CWD;
if (!docProjectCwd)
  throw new Error(`Missing DOC_PROJECT_CWD variable`);

const safeUnlink = (/** @type string */ p) => {
  try {
    fs.unlinkSync(p);
  } catch (/** @type any */ err) {
    if (err.code !== `ENOENT`) {
      throw err;
    }
  }
};

safeUnlink(path.join(__dirname, `docs`));
safeUnlink(path.join(__dirname, `mael.config.js`));

fs.symlinkSync(
  path.join(docProjectCwd, `website/docs`),
  path.join(__dirname, `docs`),
);

fs.symlinkSync(
  path.join(docProjectCwd, `website/config.js`),
  path.join(__dirname, `mael.config.js`),
);

const baseConfig = require(`./mael.config`);

function generateIcon() {
  const fontFile = require.resolve(`@fontsource/leckerli-one/files/leckerli-one-latin-400-normal.woff`);
  const fontBuffer = fs.readFileSync(fontFile).buffer;

  const font = parseFont(fontBuffer);
  const fontPath = font.getPath(`${baseConfig.icon.letter}`, 0, 0, 90);

  const bbox = fontPath.getBoundingBox();
  const pathData = fontPath.toPathData(2);

  const w = bbox.x2 - bbox.x1;
  const h = bbox.y2 - bbox.y1;

  fs.writeFileSync(`static/logo.svg`, [
    `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 100 100">\n`,
    `  <rect width="100" height="100" rx="20" fill="${baseConfig.colors.primary}"/>\n`,
    `  <path transform="translate(${-bbox.x1 + (50 - w / 2)}, ${-bbox.y1 + (50 - h / 2)})" fill="#fff" d="${pathData}"/>\n`,
    `</svg>\n`,
  ].join(``));
}

function generateCustomStyle() {
  fs.writeFileSync(`src/css/generated.css`, [
    `:root {\n`,
    `  --ifm-color-primary: ${baseConfig.colors.primary};\n`,
    `  --ifm-color-primary-dark: ${colord(baseConfig.colors.primary).darken(.1)};\n`,
    `  --ifm-color-primary-darker: ${colord(baseConfig.colors.primary).darken(.3)};\n`,
    `  --ifm-color-primary-darkest: ${colord(baseConfig.colors.primary).darken(.5)};\n`,
    `  --ifm-color-primary-light: ${colord(baseConfig.colors.primary).lighten(.1)};\n`,
    `  --ifm-color-primary-lighter: ${colord(baseConfig.colors.primary).lighten(.3)};\n`,
    `  --ifm-color-primary-lightest: ${colord(baseConfig.colors.primary).lighten(.5)};\n`,
    `  --ifm-code-font-size: 95%;\n`,
    `}`,
  ].join(``));
}

generateIcon();
generateCustomStyle();

/** @type {import('@docusaurus/types').PluginModule} */
const customDocusaurusPlugin = (context, options) => {
  return {
    name: `mael-docusaurus-plugin`,
    configureWebpack(config, isServer, utils) {
      return {
        resolve: {
          symlinks: false,
          alias: {
            [`@doc/project`]: `${docProjectCwd}/`,
            [`@doc/template`]: `${__dirname}/`,
          },
        },
      };
    },
  };
};

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: baseConfig.name,
  tagline: baseConfig.description,

  url: `https://mael.dev/${baseConfig.repository}/`,
  baseUrl: process.env.CONTEXT === `production` ? `/${baseConfig.repository}/` : `/`,

  onBrokenLinks: `throw`,
  onBrokenMarkdownLinks: `warn`,

  favicon: `logo.svg`,

  organizationName: `arcanis`,
  projectName: baseConfig.repository,

  presets: [
    [
      `classic`,
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: path.resolve(__dirname, `docs`),
          sidebarCollapsible: false,
          sidebarPath: require.resolve(`./sidebars.js`),
          editUrl: `https://github.com/arcanis/${baseConfig.repository}/tree/main/website`,
        },
        theme: {
          customCss: [
            require.resolve(`./src/css/generated.css`),
            require.resolve(`./src/css/custom.css`),
          ],
        },
      }),
    ],
  ],

  plugins: [
    customDocusaurusPlugin,
  ],

  /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
  themeConfig: ({
    algolia: {
      apiKey: baseConfig.algolia,
      indexName: baseConfig.repository,
    },
    navbar: {
      title: baseConfig.name,
      logo: {
        alt: `${baseConfig.name} Logo`,
        src: `logo.svg`,
      },
      items: [{
        type: `doc`,
        docId: Object.values(baseConfig.sidebar)[0][0],
        position: `left`,
        label: `Docs`,
      }, {
        href: `https://github.com/arcanis/${baseConfig.repository}`,
        label: `GitHub`,
        position: `right`,
      }],
    },
    footer: {
      style: `dark`,
      links: [{
        title: `Community`,
        items: [{
          label: `Discord`,
          href: `https://discordapp.com/invite/yarnpkg`,
        }, {
          label: `Twitter`,
          href: `https://twitter.com/arcanis`,
        }],
      }, {
        title: `More`,
        items: [{
          label: `GitHub`,
          href: `https://github.com/arcanis/${baseConfig.repository}`,
        }],
      }],
      copyright: `Copyright © ${new Date().getFullYear()} Maël Nison. Documentation built with Docusaurus.`,
    },
    prism: {
      theme: eval(`darkCodeTheme`),
      darkTheme: eval(`lightCodeTheme`),
    },
  }),
};

module.exports = config;
