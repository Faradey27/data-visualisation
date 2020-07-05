import React, { Fragment, memo } from 'react';
import { defineMessage, useIntl } from 'react-intl';
import clsx from 'clsx';

import { useNavigationPath } from '../../hooks/useNavigationPath';
import Icon, { IconName } from '../Icon';
import styles from './NavigationBar.module.scss';

const messages = defineMessage({
  awsConsole: {
    id: 'navigationBar.awsConsoleLink',
    defaultMessage: 'Aws console',
  },
  configuration: {
    id: 'navigationBar.configurationLink',
    defaultMessage: 'Configuration',
  },
});

const NavigationBar: React.FC<{}> = () => {
  const items = useNavigationPath();
  const intl = useIntl();

  return (
    <div className={styles.root}>
      <div>
        {items.map((item, index, arr) => {
          return (
            <Fragment key={item.id}>
              <a
                href={item.href}
                className={clsx(styles.linkText, styles.breadcrumb)}
              >
                {item.label}
              </a>
              {index < arr.length - 1 && (
                <span
                  className={clsx(
                    styles.linkText,
                    styles.breadcrumb,
                    styles.crumbSeparator
                  )}
                >
                  →
                </span>
              )}
            </Fragment>
          );
        })}
      </div>
      <div className={styles.links}>
        <a href="#awsconsole" className={styles.linkText}>
          {intl.formatMessage(messages.awsConsole)}
          <Icon iconName={IconName.external} className={styles.linkTextIcon} />
        </a>
        <a href="#awsconsole" className={styles.linkText}>
          {intl.formatMessage(messages.configuration)}
          <Icon iconName={IconName.settings} className={styles.linkTextIcon} />
        </a>
      </div>
    </div>
  );
};

export default memo(NavigationBar);
