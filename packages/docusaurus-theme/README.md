# @throwparty/docusaurus-theme

Shared Docusaurus theme for throw.party sites: design tokens (`--tp-*`),
Infima overrides, shared components, and MDX components (`GitHubLink`, `Tree`,
`Tabs`).

## Usage

```sh
yarn add @throwparty/docusaurus-theme
```

The package is published to GitHub Packages, private to the org. One-time setup
for your machine: the `~/.npmrc` and `~/.yarnrc.yml` registry configuration
documented in the
[handbook](https://handbook.throw.party/setup/runtime/node/releasing).

Local development: use a portal dependency instead
(`"@throwparty/docusaurus-theme": "portal:../docusaurus-contrib"`).

Wire it up in `docusaurus.config.ts`:

```ts
export default {
  themes: ["@throwparty/docusaurus-theme"],
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
    <h1 className="tp-hero-title">{siteConfig.title}</h1>
    <p className="tp-hero-lede">{siteConfig.tagline}</p>
  </div>
</header>
```

Customise once per site in the site's `customCss` via tokens:

- `--tp-hero-bg`
- `--tp-hero-border-color`
- `--tp-hero-eyebrow-color`
- `--tp-hero-lede-color`

## Grid snapping

The page background paints 2.5rem graph-paper cells anchored to the page
top. Full-bleed bands (`.tp-hero`, `.hero`, `.footer`, and anything marked
`data-tp-snap`) are grown by a client module so their top and bottom edges
land on grid lines — growth only in whole-cell units (ported from www's
`snapBands`). Mark your own homepage bands with `data-tp-snap` to opt in.

## MDX components

Available in MDX without any site `src/theme/MDXComponents.tsx`:

- `GitHubLink` — `repo`, `ref`, `blob`
- `Tree`, `TreeItem`
- `Tabs`, `TabItem` (re-exported from theme-classic)

## Development

```sh
yarn install
yarn build   # tsc → lib/, copies non-TS assets
```

Published tarballs build `dist/` via `prepublishOnly`, so there is nothing to
commit. Portal consumers load `dist/` from the workspace, so run `yarn build`
locally after source changes.
