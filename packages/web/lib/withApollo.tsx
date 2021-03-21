// lib/withApollo.js
import withApollo from 'next-with-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { parseCookies } from 'nookies'

//import fetch from 'node-fetch'

export default withApollo(
  ({ ctx, headers, initialState }) => {
    return new ApolloClient({
      uri: 'http://localhost:4000',
      request: (operation) => {
        const cookies = parseCookies(ctx);
        const token = cookies.token;

        operation.setContext({
          headers: {
            authorization: token ? `Bearer ${token}` : ''
          }
        })
      },
      cache: new InMemoryCache().restore(initialState || {}),
    });
  },
  {
    render: ({ Page, props }) => {
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} />
        </ApolloProvider>
      );
    }
  }
);
