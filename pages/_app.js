import axios from 'axios';
import React from 'react';
import App, {Container} from 'next/app';
import {Provider} from "react-redux";
import {initializeStore} from "../src/store";
import Link from 'next/link';

// isServer for client/server differentiation
const isServer = typeof window === 'undefined';

let axiosInstance;

const getOrCreateStore = initialState => {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return initializeStore(initialState, axiosInstance);
  }

  // Create store if unavailable on the client and set it on the window object
  if (!window['__NEXT_REDUX_STORE__']) {
    window['__NEXT_REDUX_STORE__'] = initializeStore(initialState, axiosInstance);
  }
  return window['__NEXT_REDUX_STORE__']
};

class MyApp extends App {

  static async getInitialProps({ Component, ctx }) {
    if (isServer) {
      axiosInstance = axios.create({
        baseURL: 'http://127.0.0.1:3000/',
        withCredentials: true,
        headers: {...ctx.req.headers }
      });
    }

    ctx.reduxStore = getOrCreateStore();

    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return {
      pageProps,
      reduxInitialState: ctx.reduxStore.getState()
    }
  }

  constructor(props) {
    super(props);

    if (!isServer) {
      axiosInstance = axios.create({
        baseURL: '/',
        withCredentials: true,
      });
    }

    this.reduxStore = getOrCreateStore(props.reduxInitialState);
  }

  render() {
    const {Component, pageProps} = this.props;

    return (
      <Container>
        {/*language=CSS*/}
        <style global jsx>{`

          html,
          body {
            padding: 0;
            margin: 0;
          }

          .container {
            max-width: 1400px;
            margin: 0 auto;
          }

          .brand {
            font-size: 24px;
            font-weight: bold;
          }

          .navigation {
            margin-top: 5px;
          }

          .navigation a {
            padding: 10px;
            border-radius: 5px;
            display: inline-block;
            font-size: 18px;
            text-decoration: none;
          }

          .navigation a:hover {
            background-color: #f4f4f4;
          }

          .flex {
            display: flex;
          }

          .flex-any {
            flex: 1;
          }

          .flex-any:first-child {
            margin-right: 15px;
            padding-right: 15px;
            border-right: 1px solid lightgray;
          }

        `}</style>
        <div className="container">

          <div className="navigation">

            <Link href="/"><a><span className="brand">User explorer</span></a></Link>

            <Link href="/users"><a>Users</a></Link>

            <Link href="/posts"><a>Posts</a></Link>

            <Link href="/comments"><a>Comments</a></Link>

            <hr/>

          </div>

          <Provider store={this.reduxStore}>
            <Component {...pageProps} />
          </Provider>
        </div>


      </Container>
    )
  }
}

export default MyApp