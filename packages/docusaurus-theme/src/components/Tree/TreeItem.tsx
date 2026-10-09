import React, { useState, Children, isValidElement } from "react";
import type { ReactElement, ReactNode } from "react";
import styles from "./styles.module.css";

type TreeItemProps = {
  icon?: string;
  iconSize?: number;
  badge?: string;
  label: ReactNode;
  expanded?: boolean;
  children?: ReactNode;
  level?: number;
};

type ChildProps = {
  level?: number;
};

export default function TreeItem({
  icon,
  iconSize = 24,
  badge,
  label,
  expanded = false,
  children,
  level = 0,
}: TreeItemProps) {
  const [isExpanded, setIsExpanded] = useState(expanded);

  const childElements = Children.toArray(children).filter(isValidElement) as ReactElement<ChildProps>[];
  const hasChildren = childElements.length > 0;

  const toggleExpand = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className={styles.treeNode}>
      <div
        className={`${styles.nodeContent} ${hasChildren ? styles.hasChildren : ""}`}
        style={{ paddingLeft: `${level * 20}px` }}
        onClick={toggleExpand}
      >
        {hasChildren && (
          <span className={styles.expandIcon}>{isExpanded ? "▼" : "▶"}</span>
        )}

        {icon ? (
          <span className={styles.nodeIcon}>
            <span style={{ fontSize: `${iconSize}px`, lineHeight: 1 }}>
              {icon}
            </span>
            <span className={styles.nodeLabel}>{label}</span>
          </span>
        ) : (
          <span className={styles.nodeLabel}>{label}</span>
        )}

        {badge && <span className={styles.nodeBadge}>{badge}</span>}
      </div>

      {hasChildren && isExpanded && (
        <div className={styles.nodeChildren}>
          {childElements.map((child, index) =>
            React.cloneElement(child, {
              key: index,
              level: level + 1,
            }),
          )}
        </div>
      )}
    </div>
  );
}
