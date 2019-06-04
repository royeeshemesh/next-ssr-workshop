import React from 'react';
import App, {Container} from 'next/app';
import {Provider} from 'react-redux';
import {initializeStore} from '../src/store';
import Link from 'next/link';

class MyApp extends App {
  static async getInitialProps(appContext) {
    const appProps = {
      royee: 'shemesh'
    };

    const {Component} = appContext;

    if (Component.getInitialProps) {
      // Component can be one of home/users/posts/comments
      const componentProps = await Component.getInitialProps(appContext);

      Object.assign(appProps, componentProps);
    }

    return appProps;
  }

  constructor(props) {
    super(props);

    console.info('MyApp constructor', props);

    this.reduxStore = initializeStore();
    console.info('generating new redux store');
  }

  componentDidMount() {
    console.info('MyApp did mount');
  }

  render() {
    const {Component, pageProps} = this.props;

    console.info('MyApp render');

    return (
      <Container>
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