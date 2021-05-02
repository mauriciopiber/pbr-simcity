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
          /* roboto-100 - latin */
          @font-face {
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 100;
            src: local(''),
                url('/fonts/roboto-v27-latin-100.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
                url('/fonts/roboto-v27-latin-100.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
          }
          /* roboto-100italic - latin */
          @font-face {
            font-family: 'Roboto';
            font-style: italic;
            font-weight: 100;
            src: local(''),
                url('/fonts/roboto-v27-latin-100italic.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
                url('/fonts/roboto-v27-latin-100italic.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
          }
          /* roboto-300 - latin */
          @font-face {
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 300;
            src: local(''),
                url('/fonts/roboto-v27-latin-300.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
                url('/fonts/roboto-v27-latin-300.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
          }
          /* roboto-300italic - latin */
          @font-face {
            font-family: 'Roboto';
            font-style: italic;
            font-weight: 300;
            src: local(''),
                url('/fonts/roboto-v27-latin-300italic.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
                url('/fonts/roboto-v27-latin-300italic.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
          }
          /* roboto-regular - latin */
          @font-face {
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 400;
            src: local(''),
                url('/fonts/roboto-v27-latin-regular.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
                url('/fonts/roboto-v27-latin-regular.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
          }
          /* roboto-italic - latin */
          @font-face {
            font-family: 'Roboto';
            font-style: italic;
            font-weight: 400;
            src: local(''),
                url('/fonts/roboto-v27-latin-italic.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
                url('/fonts/roboto-v27-latin-italic.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
          }
          /* roboto-500 - latin */
          @font-face {
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 500;
            src: local(''),
                url('/fonts/roboto-v27-latin-500.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
                url('/fonts/roboto-v27-latin-500.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
          }
          /* roboto-500italic - latin */
          @font-face {
            font-family: 'Roboto';
            font-style: italic;
            font-weight: 500;
            src: local(''),
                url('/fonts/roboto-v27-latin-500italic.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
                url('/fonts/roboto-v27-latin-500italic.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
          }
          /* roboto-700 - latin */
          @font-face {
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 700;
            src: local(''),
                url('/fonts/roboto-v27-latin-700.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
                url('/fonts/roboto-v27-latin-700.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
          }
          /* roboto-700italic - latin */
          @font-face {
            font-family: 'Roboto';
            font-style: italic;
            font-weight: 700;
            src: local(''),
                url('/fonts/roboto-v27-latin-700italic.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
                url('/fonts/roboto-v27-latin-700italic.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
          }
          /* roboto-900 - latin */
          @font-face {
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 900;
            src: local(''),
                url('/fonts/roboto-v27-latin-900.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
                url('/fonts/roboto-v27-latin-900.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
          }
          /* roboto-900italic - latin */
          @font-face {
            font-family: 'Roboto';
            font-style: italic;
            font-weight: 900;
            src: local(''),
                url('/fonts/roboto-v27-latin-900italic.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
                url('/fonts/roboto-v27-latin-900italic.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
          }
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

          html,
          body {
            font-family: 'Roboto';
            font-weight: 400;
            font-size: 16px;
            margin: 0;
            padding: 0;
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
