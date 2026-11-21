# @throwparty/docusaurus-theme

Shared Docusaurus theme for throw.party sites: design tokens (`--tp-*`),
Infima overrides, self-hosted fonts, shared components, and MDX components
(`GitHubLink`, `Tree`, `Tabs`).

The look mirrors [throw.party](https://throw.party): sunset-after-dark
palette, neon pink/cyan/violet accents, Orbitron display type, Chakra Petch
body type, Share Tech Mono code, 2px corners and glow in place of depth.

## Usage

```sh
yarn add @throwparty/docusaurus-theme
```

The package is published to GitHub Packages, private to the org. One-time setup
for your machine: the `~/.npmrc` and `~/.yarnrc.yml` registry configuration
documented in the
[handbook](https://handbook.throw.party/setup/runtime/node/releasing).

Local development: use a portal dependency instead
(`"@throwparty/docusaurus-theme": "portal:../docusaurus-contrib/packages/docusaurus-theme"`).

Wire it up in `docusaurus.config.ts`:

```ts
export default {
  themes: ["@throwparty/docusaurus-theme"],
  themeConfig: {
    colorMode: {
      // Night is the default; light mode is opt-in.
      defaultMode: "dark",
      respectPrefersColorScheme: true,
    },
  },
  // ...rest
};
```

The theme ships no static files, so the default `staticDirectories: ["static"]`
stays untouched.

Requirements:

- `future.v4: true` (enables `useCssCascadeLayers`). The theme's CSS lives in
  the `throwparty` cascade layer so your own `customCss` (unlayered) always
  overrides it. Without layers, ordering between the theme and site CSS would
  depend on bundle order.
- The theme must be listed after `@docusaurus/theme-classic` (it is: site
  `themes` come after preset themes).

## Type

The three families are bundled as latin `woff2` subsets and declared with
`@font-face` by `styles.css`; sites do not need a font plugin. Override the
families per site via `--tp-font-display`, `--tp-font-sans`, or
`--tp-font-mono`.

## Tokens

Palette (both themes, values swap with `data-theme`):

- `--tp-bg`, `--tp-panel`, `--tp-surface-alt`
- `--tp-fg`, `--tp-muted`
- `--tp-line`, `--tp-line-strong`
- `--tp-pink` (primary), `--tp-cyan` (focus/link hover), `--tp-violet`,
  `--tp-orange`, `--tp-yellow`, `--tp-green`, `--tp-amber`, `--tp-red`
- `--tp-accent` is kept as an alias of `--tp-pink` for existing site CSS.

Geometry: `--tp-radius: 2px`, `--tp-page-width: 76rem`.
Surface helpers: `--tp-navbar-bg`, `--tp-btn-grad`, `--tp-btn-ink`,
`--tp-chrome` (the chrome text gradient), `--tp-glow`.

Infima variables (`--ifm-*`) are derived from these, so normal Docusaurus
components inherit the design. The stylesheet also paints the animated neon
marquee at the top of the viewport, the masthead haze, sidebar panel, code
block frames, admonitions, tabs, pagination and footer.

## Brand assets

Owned by each site — the theme ships no static files (`staticDirectories`
copy precedence is racy in Docusaurus, so a single site-owned `static` dir
keeps output deterministic):

- Ship `static/img/logo.svg` and `static/img/favicon.ico` in the site.
- The logo is rendered inline via a sprite: the SVG file must wrap its
  artwork in `<symbol id="logo-root" viewBox="...">`. The component carries
  no hardcoded viewBox — the symbol supplies it.
- Set intrinsic size in themeConfig so the navbar SVG keeps its aspect ratio:

```ts
navbar: {
  logo: {
    src: "img/logo.svg",
    alt: "…",
    width: 200,
    height: 200,
  },
}
```

## Homepage hero

Global classes for `src/pages/index.tsx` (replace local CSS-module styles):

```tsx
<header className="tp-hero">
  <div className="container">
    <p className="tp-hero-eyebrow">throw.party</p>
    <h1 className="tp-hero-title">
      <span className="tp-chrome">{siteConfig.title}</span>
    </h1>
    <p className="tp-hero-lede">{siteConfig.tagline}</p>
  </div>
</header>
```

Customise once per site in the site's `customCss` via tokens:

- `--tp-hero-bg`
- `--tp-hero-border-color`
- `--tp-hero-eyebrow-color`
- `--tp-hero-lede-color`

## MDX components

Available in MDX without any site `src/theme/MDXComponents.tsx`:

- `GitHubLink` — `repo`, `ref`, `blob`
- `Tree`, `TreeItem`
- `Tabs`, `TabItem` (re-exported from theme-classic)

## Development

```sh
yarn install
yarn build   # tsc → dist/, copies non-TS assets
```

Published tarballs build `dist/` via `prepack`, so there is nothing to commit.
Portal consumers load `dist/` from the workspace, so run `yarn build` locally
after source changes.
