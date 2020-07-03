import React, { memo } from 'react';
import { defineMessage, useIntl } from 'react-intl';
import { faCog, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

import { useNavigationPath } from '../../hooks/useNavigationPath';
import Text from '../Text';
import { TextColor } from '../Text/Text';
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
            <Text
              key={item.id}
              link
              uppercase
              color={TextColor.secondary}
              href={item.href}
            >
              {item.label}
              {arr.length - 1 !== index ? ' → ' : ''}
            </Text>
          );
        })}
      </div>
      <div className={styles.links}>
        <div className={styles.awsConsoleTextContainer}>
          <Text
            link
            uppercase
            color={TextColor.accent}
            href="#awsconsole"
            iconRight={faExternalLinkAlt}
          >
            {intl.formatMessage(messages.awsConsole)}
          </Text>
        </div>
        <Text
          link
          uppercase
          color={TextColor.accent}
          href="#configuration"
          iconRight={faCog}
        >
          {intl.formatMessage(messages.configuration)}
        </Text>
      </div>
    </div>
  );
};

export default memo(NavigationBar);
