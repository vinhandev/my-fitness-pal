import { Slot, Stack } from 'expo-router';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from '@apollo/client';

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
    <ApolloProvider client={client}>
      <Slot />
    </ApolloProvider>
  );
}
