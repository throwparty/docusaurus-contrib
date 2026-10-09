import React, { type ComponentProps, type ReactNode } from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

type NavbarLogo = {
  readonly src: string;
  readonly alt?: string;
  readonly href?: string;
  readonly target?: string;
  readonly className?: string;
  readonly width?: number;
  readonly height?: number;
};

type NavbarConfig = {
  readonly title?: string;
  readonly logo?: NavbarLogo;
};

export interface Props extends ComponentProps<"a"> {
  readonly imageClassName?: string;
  readonly titleClassName?: string;
  readonly hideTitle?: boolean;
}

/**
 * Renders the site logo as an inline <svg> sprite:
 * `<use href="{logo.src}#logo-root" />`. The logo file must wrap its artwork
 * in `<symbol id="logo-root" viewBox="...">`; the symbol supplies the aspect
 * ratio, so the component carries no hardcoded viewBox. Set navbar.logo
 * width/height in themeConfig so the svg has an intrinsic ratio.
 *
 * `imageClassName` lands on the <svg> itself (sizing/color via CSS),
 * `hideTitle` renders without the navbar title (e.g. large homepage logos).
 */
export default function Logo({
  imageClassName,
  titleClassName,
  hideTitle,
  ...propsRest
}: Props): ReactNode {
  const {
    siteConfig: { title, themeConfig },
  } = useDocusaurusContext();
  const { title: navbarTitle, logo } = (themeConfig as {
    navbar?: NavbarConfig;
  }).navbar ?? {};

  const logoLink = useBaseUrl(logo?.href || "/");
  const logoUrl = useBaseUrl(logo?.src);

  // If a visible title is shown, fallback alt text is empty to mark the
  // logo as decorative.
  const fallbackAlt = navbarTitle ? "" : title;
  const alt = logo?.alt ?? fallbackAlt;

  const ratio =
    logo?.width && logo?.height
      ? { aspectRatio: `${logo.width} / ${logo.height}` }
      : undefined;

  const className = [imageClassName, logo?.className]
    .filter(Boolean)
    .join(" ");

  return (
    <Link
      to={logoLink}
      {...propsRest}
      {...(logo?.target && { target: logo.target })}
    >
      {logo && (
        <svg
          className={className || undefined}
          fill="currentColor"
          style={ratio}
          {...(alt
            ? { role: "img", "aria-label": alt }
            : { "aria-hidden": true })}
        >
          <use href={`${logoUrl}#logo-root`} />
        </svg>
      )}
      {!hideTitle && navbarTitle != null && (
        <b className={titleClassName}>{navbarTitle}</b>
      )}
    </Link>
  );
}
