import React from 'react';
import { IntlProvider } from 'react-intl';
import { render } from '@testing-library/react';

import App from './App';

test('renders root element', () => {
  const { getByTestId } = render(
    <IntlProvider locale="en">
      <App />
    </IntlProvider>
  );
  const rootElement = getByTestId('app-root');
  expect(rootElement).toBeInTheDocument();
});
