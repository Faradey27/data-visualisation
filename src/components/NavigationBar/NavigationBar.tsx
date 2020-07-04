import React, { Fragment, memo } from 'react';
import { defineMessage, useIntl } from 'react-intl';
import { faCog, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

import { useNavigationPath } from '../../hooks/useNavigationPath';
import Text from '../Text';
import { TextColor, TextSize } from '../Text/Text';
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
              <Text
                link
                uppercase
                size={TextSize.small}
                color={TextColor.secondary}
                href={item.href}
              >
                {item.label}
              </Text>
              {index < arr.length - 1 && (
                <Text
                  color={TextColor.secondary}
                  className={styles.crumbSeparator}
                >
                  →
                </Text>
              )}
            </Fragment>
          );
        })}
      </div>
      <div className={styles.links}>
        <Text
          link
          uppercase
          color={TextColor.accent}
          size={TextSize.small}
          href="#awsconsole"
          iconRight={faExternalLinkAlt}
        >
          {intl.formatMessage(messages.awsConsole)}
        </Text>
        <Text
          link
          uppercase
          color={TextColor.accent}
          href="#configuration"
          size={TextSize.small}
          iconRight={faCog}
        >
          {intl.formatMessage(messages.configuration)}
        </Text>
      </div>
    </div>
  );
};

export default memo(NavigationBar);
