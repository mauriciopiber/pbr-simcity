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
  ({ ctx, initialState }) => {

    const GRAPHQL_API: string | undefined = process.env.GRAPHQL_API_CLIENT;

    if (GRAPHQL_API === undefined) {
      throw new Error('Missing GRAPHQL_API environment');
    }

    return new ApolloClient({
      uri: GRAPHQL_API,
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
    })
  },
  {
    render: InitComponentWithApollo,
  },
);
