// lib/withApollo.js
import React, { FC } from 'react';
import withApollo from 'next-with-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { parseCookies } from 'nookies';


interface PageProps {
  Page: any;
  props: any;
}
// import fetch from 'node-fetch'

const InitComponentWithApollo: FC<PageProps> = ({ Page, props }) => (
  <ApolloProvider client={props.apollo}>
    <Page {...props} />
  </ApolloProvider>
)

export default withApollo(
  ({ ctx, initialState }) => new ApolloClient({
    uri: 'http://localhost:4000',
    request: (operation) => {
      const cookies = parseCookies(ctx);
      const { token } = cookies;

      operation.setContext({
        headers: {
          authorization: token ? `Bearer ${token}` : '',
        },
      });
    },
    cache: new InMemoryCache().restore(initialState || {}),
  }),
  {
    render: InitComponentWithApollo,
  },
);
