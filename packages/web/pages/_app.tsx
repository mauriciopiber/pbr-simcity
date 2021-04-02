import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import type { AppProps /* , AppContext */ } from 'next/app';
import withApollo from '@pbr-simcity/web/lib/withApollo';
import Layout from '@pbr-simcity/web/components/UI/Layout/Layout';

function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <>
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
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default withApollo(MyApp);
