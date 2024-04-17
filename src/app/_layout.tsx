import { Slot, Stack } from 'expo-router';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from '@apollo/client';
import { Provider } from 'react-redux';
import { persistor, store } from '../store';
import { PersistGate } from 'redux-persist/integration/react';
import { Text } from 'react-native';

const client = new ApolloClient({
  uri: 'https://liuhe.stepzen.net/api/getting-started/__graphql',
  cache: new InMemoryCache(),
  headers: {
    Authorization:
      'apikey liuhe::stepzen.io+1000::404d1afccf48ebb29f69e7af557d9deac8ce2e04a89a877de5955510bf2678a5',
  },
});
export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <ApolloProvider client={client}>
          <Stack screenOptions={{ headerShown: false }} />
        </ApolloProvider>
      </PersistGate>
    </Provider>
  );
}
