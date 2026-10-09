declare module "@theme/Logo" {
  import type { ComponentProps, ReactNode } from "react";

  export interface Props extends ComponentProps<"a"> {
    readonly imageClassName?: string;
    readonly titleClassName?: string;
  }
  export default function Logo(props: Props): ReactNode;
}
