import React, { memo } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

import styles from './Text.module.scss';

export enum TextColor {
  primary = 'primary',
  secondary = 'secondary',
  accent = 'accent',
}

export enum TextSize {
  small = 'small',
}

interface TextProps {
  children: React.ReactNode;
  color?: TextColor;
  size?: TextSize;
  uppercase?: boolean;
  link?: boolean;
  href?: string;
  iconRight?: IconProp;
}

const Text: React.FC<TextProps> = ({
  link,
  href,
  uppercase,
  color,
  size,
  iconRight,
  children,
}) => {
  const className = clsx(styles.root, {
    [styles.small]: size === TextSize.small,
    [styles.uppercase]: uppercase,
    [styles.primary]: color === TextColor.primary,
    [styles.secondary]: color === TextColor.secondary,
    [styles.accent]: color === TextColor.accent,
  });

  const content = (
    <>
      {children}
      {iconRight ? (
        <FontAwesomeIcon
          className={styles.iconRight}
          icon={iconRight}
          color="inherit"
        />
      ) : null}
    </>
  );

  if (link) {
    return (
      <a href={href} className={className}>
        {content}
      </a>
    );
  }

  return <span className={className}>{content}</span>;
};

export default memo(Text);
