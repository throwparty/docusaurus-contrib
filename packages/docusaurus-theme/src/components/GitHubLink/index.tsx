import React from "react";
import Link from "@docusaurus/Link";

type GitHubLink = {
  repo: string;
  ref: string;
  blob: string;
};

export default function GitHubLink({ repo, ref, blob }: GitHubLink) {
  let destination = `https://github.com/${repo}`;
  if (blob) {
    destination += `/blob/${ref}/${blob}`;
  }

  let title = repo;
  if (blob) {
    title += `: ${blob}@${ref}`;
  }
  return <Link to={destination}>{title}</Link>;
}
