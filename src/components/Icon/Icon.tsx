import React, { FunctionComponent, SVGProps } from 'react';
import clsx from 'clsx';

import { ReactComponent as ClockIcon } from './assets/clock.svg';
import { ReactComponent as DatabaseIcon } from './assets/database.svg';
import { ReactComponent as DocumentIcon } from './assets/document.svg';
import { ReactComponent as SigmaIcon } from './assets/sigma.svg';
import styles from './Icon.module.scss';

export enum IconName {
  clock = 'clock',
  sigma = 'sigma',
  database = 'database',
  document = 'document',
}

interface IconProps {
  iconName: IconName;
  className?: string;
}

const IconsMap: {
  [key in IconName]: FunctionComponent<SVGProps<SVGSVGElement>>;
} = {
  clock: ClockIcon,
  sigma: SigmaIcon,
  database: DatabaseIcon,
  document: DocumentIcon,
};

const Icon: React.FC<IconProps> = ({ iconName, className }) => {
  const SelectedIcon = IconsMap[iconName];
  return <SelectedIcon className={clsx(styles.root, className)} />;
};

export default Icon;
