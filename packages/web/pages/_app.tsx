import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import type { AppProps /*, AppContext */ } from 'next/app'
import withApollo from '../lib/withApollo';
import Layout from '../components/Layout/Layout';


function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <React.Fragment>
      <Head>
        <title>Sim City</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default withApollo(MyApp);
