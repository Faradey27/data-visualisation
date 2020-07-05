import React, { FunctionComponent, SVGProps } from 'react';
import clsx from 'clsx';

import { ReactComponent as AlertIcon } from './assets/alert.svg';
import { ReactComponent as CalendarIcon } from './assets/calendar.svg';
import { ReactComponent as CaretDownIcon } from './assets/caret-down.svg';
import { ReactComponent as ClockIcon } from './assets/clock.svg';
import { ReactComponent as DatabaseIcon } from './assets/database.svg';
import { ReactComponent as DocumentIcon } from './assets/document.svg';
import { ReactComponent as DownArrowIcon } from './assets/down-arrow.svg';
import { ReactComponent as ExternalIcon } from './assets/external.svg';
import { ReactComponent as GreekIcon } from './assets/greek.svg';
import { ReactComponent as IdeaIcon } from './assets/idea.svg';
import { ReactComponent as ProblemIcon } from './assets/problem.svg';
import { ReactComponent as SettingsIcon } from './assets/settings.svg';
import { ReactComponent as SigmaIcon } from './assets/sigma.svg';
import { ReactComponent as UserIcon } from './assets/user.svg';
import styles from './Icon.module.scss';

export enum IconName {
  clock = 'clock',
  sigma = 'sigma',
  database = 'database',
  document = 'document',
  problem = 'problem',
  external = 'external',
  alert = 'alert',
  idea = 'idea',
  settings = 'settings',
  greek = 'greek',
  caretDown = 'caretDown',
  user = 'user',
  downArrow = 'downArrow',
  calendar = 'calendar',
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
  problem: ProblemIcon,
  external: ExternalIcon,
  settings: SettingsIcon,
  alert: AlertIcon,
  idea: IdeaIcon,
  greek: GreekIcon,
  caretDown: CaretDownIcon,
  user: UserIcon,
  downArrow: DownArrowIcon,
  calendar: CalendarIcon,
};

const Icon: React.FC<IconProps> = ({ iconName, className }) => {
  const SelectedIcon = IconsMap[iconName];
  return <SelectedIcon className={clsx(styles.root, className)} />;
};

export default Icon;
