// Changesets resolves its configured changelog generator with
// import-meta-resolve, which reimplements Node's resolution algorithm and so
// bypasses Yarn PnP (it looks for node_modules dirs, and there are none).
// Re-export through a real module file so the import goes through Node's ESM
// loader, which PnP patches.
export { default } from "@changesets/changelog-github";
