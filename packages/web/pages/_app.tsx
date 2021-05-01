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
      <style jsx global>
        {`
           :root {
            --color-industry:  #aec4e8;
            --color-fashion: #aed7e8;
            --color-hardware: #e8b7ae;
            --color-supplies: #e8d0ae;
            --color-home-appliances: #aeb4e8;
            --color-donut: #e5aee8;
            --color-farmers: #e2e8ae;
            --color-fast-food:#afe8ae;
            --color-gardening: #aee8c1;
            --color-furniture: #aec7e8;
          }

          .building-industry {
            background-color: var(--color-industry);
          }

          .building-fashion {
            background-color: var(--color-fashion);
          }

          .building-hardware {
            background-color: var(--color-hardware);
          }

          .building-supplies {
            background-color: var(--color-supplies);
          }

          .building-home-appliances {
            background-color: var(--color-home-appliances);
          }

          .building-donut {
            background-color: var(--color-donut);
          }

          .building-farmers {
            background-color: var(--color-farmers);
          }

          .building-fast-food {
            background-color: var(--color-fast-food);
          }

          .building-gardening {
            background-color: var(--color-gardening);
          }

          .building-furniture {
            background-color: var(--color-furniture)
          }
        `}
      </style>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default withApollo(MyApp);
