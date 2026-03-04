import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import { ApolloProvider } from '@apollo/client';
import './index.css';
import { apolloClient } from './graphql';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={ apolloClient }>
        <App />
      </ApolloProvider>
    </Provider>
  </React.StrictMode>
);
