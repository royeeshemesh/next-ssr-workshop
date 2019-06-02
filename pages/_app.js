import React from 'react';
import App, {Container} from 'next/app';
import {Provider} from 'react-redux';
import {initializeStore} from '../src/store';
import Link from 'next/link';

class MyApp extends App {
  constructor(props) {
    super(props);

    // create redux store
    this.reduxStore = initializeStore();
    console.info('creating redux store');
  }

  render() {
    const {Component, pageProps} = this.props;

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