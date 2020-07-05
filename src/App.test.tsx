import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

import App from './App';
import { configureStore } from './state';

const store = configureStore();

test('renders root element', () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <IntlProvider locale="en">
        <App />
      </IntlProvider>
    </Provider>
  );
  const rootElement = getByTestId('app-root');
  expect(rootElement).toBeInTheDocument();
});
