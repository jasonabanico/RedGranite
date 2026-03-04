import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './graphql';

// Wrap App with required providers for testing
const renderApp = () => {
  return render(
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <App />
      </ApolloProvider>
    </Provider>
  );
};

test('renders RedGranite heading', () => {
  renderApp();
  expect(screen.getByRole('heading', { name: /RedGranite/i })).toBeInTheDocument();
});

test('renders without crashing', () => {
  const { container } = renderApp();
  expect(container).toBeInTheDocument();
});
