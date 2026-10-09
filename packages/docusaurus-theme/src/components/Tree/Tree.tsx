import React, {
  Children,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import styles from "./styles.module.css";

type TreeProps = {
  children?: ReactNode;
};

type ChildProps = {
  level?: number;
};

export default function Tree({ children }: TreeProps) {
  return (
    <div className={styles.treeContainer}>
      <div className={styles.treeContent}>
        {Children.map(children, (child, index) => {
          if (isValidElement(child)) {
            return React.cloneElement(child as ReactElement<ChildProps>, {
              key: index,
              level: 0,
            });
          }
          return null;
        })}
      </div>
    </div>
  );
}
