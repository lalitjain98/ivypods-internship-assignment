import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import '../styles/index.scss'

class MyApp extends App {
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
  // static async getInitialProps(appContext) {
  //   // calls page's `getInitialProps` and fills `appProps.pageProps`
  //   const appProps = await App.getInitialProps(appContext);
  //
  //   return { ...appProps }
  // }

  componentDidMount() {
    // let scriptUrl = "https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY_HERE&libraries=places";
    // let s = document.createElement('script');
    // window.document.body.appendChild(s);
    // s.onload = () => { };

    // s.src = scripts[i].src;
    // if (s.integrity) s.integrity = scripts[i].integrity;
    // if (s.crossOrigin) s.crossOrigin = scripts[i].crossOrigin;
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <React.Fragment>
        <Head>
          <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
          <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAbihwfuu4_h-eo4NX4q24K0mUcckO6ico&libraries=places"></script>
        </Head>
        <Component {...pageProps} />
      </React.Fragment>
    )

  }
}

export default MyApp