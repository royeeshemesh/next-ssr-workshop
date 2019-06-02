import React from 'react';
import App, {Container} from 'next/app';
import {Provider} from "react-redux";
import {initializeStore} from "../src/store";

class MyApp extends App {
  render() {
    const {Component, pageProps} = this.props;

    const reduxStore = initializeStore();

    return (
      <Container>
        <header>
          <span>This is common header</span>
          <hr/>
        </header>

        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>

      </Container>
    )
  }
}

export default MyApp