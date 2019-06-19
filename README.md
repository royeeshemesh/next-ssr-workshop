# next-ssr-workshop

## Getting Started

Clone the repo and install dependencies: 
```bash 
$ git clone git@github.com:royeeshemesh/next-ssr-workshop.git
```

Install Dependencies 
```bash
$ npm install
```
Run a local `API` server for demo purposes:
```bash 
$ node api/index.js
$
$ # alternoivaly run pm2 in the background
$ pm2 start api/index.js
```
Run the local server
```bash
$ npm start 
```

Navigate to [localhost](http://localhost:3000)

---

## Workshop TOC

This workshop divided into two parts. 

The first is converting a client side React.js application into SSR based.

The second part is converting the same source React.js application to a Next.js SSR based.

1. **SSR**
   1. 01 - setup
   2. 02 - ssr
   3. 03 - data
   4. 04 - isomorphic
   
2. **SSR Using Next.js**
   1. 01 - setup
   2. 02 - pages
   3. 03 - all pages
   4. 04 - all pages with redux
   5. 05 - application server 
   6. 06 - client side navigation
   7. 07 - client redux
   8. 08 - next page lifecycle
   9. 09 - client/server redux
   10.10 - server routes 
   11.11 - styling
 

## Workshop appendices 

### 1.SSR .01 - setup
package.json
```bash
$ npm i http-proxy-middleware -S
$ npm i @babel/core @babel/plugin-transform-runtime @babel/preset-env @babel/preset-react @babel/runtime babel-loader css-loader nodemon npm-run-all webpack webpack-cli webpack-node-externals -D
```  

--- 

.babelrc
```json
{
  "presets": [
    "@babel/preset-react",
    [
      "@babel/preset-env",
      {
        "targets": {
          "browsers": [
            ">0.25%",
            "not ie 11",
            "not op_mini all"
          ]
        }
      }
    ],
  ],
  "plugins": [
    "@babel/plugin-transform-runtime",
    "@babel/plugin-proposal-class-properties"
  ]
}
```

---

webpack.client.js
```javascript
const path = require('path');

 module.exports = {
  mode: 'none',

   entry: './src/index.js',

   output: {
    filename: 'client-bundle.js',
    path: path.resolve(__dirname, 'public')
  },

   devtool: 'inline-sourcemap',

   module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, './src'),
        ],
        exclude: '/node_modules/'
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ]
  }
}; 
```


### 1.SSR .02 - ssr
webpack.server.js
```javascript
const path = require('path');
const nodeExternals = require('webpack-node-externals');

 module.exports = {
  mode: 'none',

   target: 'node',

   externals: [nodeExternals()],

   entry: './app-server/server.js',

   output: {
    filename: 'server-bundle.js',
    path: path.resolve(__dirname, 'build')
  },

   module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      }
    ]
  }
};
```


### 1.SSR .04 - isomorphic
server.js
```css
    html,
    body {
      padding: 0;
      margin: 0;
    }
    
    .container {
      max-width: 1400px;
      margin: 0 auto;
    }
    
    .home-intro {
      background-color: #fafafa;
      border-radius: 15px;
      padding: 30px 50px;
      border: 1px solid lightgray;
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
    
    .posts-list {
      margin: 0;
      padding: 0;
      list-style: none;
    }
    
    .posts-list li {
      padding: 20px;
      background-color: #fafafa;
      border-radius: 10px;
      margin-bottom: 15px;
      border: 1px solid lightgray;
    }
    
    .comments-list {
      margin: 0;
      padding: 0;
      list-style: none;
    }
    
    .comments-list li {
      padding: 20px;
      background-color: #fafafa;
      border-radius: 10px;
      margin-bottom: 15px;
      border: 1px solid lightgray;
    }
    
    .search-box {
      display: block;
      padding: 10px 5px;
      font-size: 16px;
      border-radius: 5px;
      min-width: 400px;
      margin-bottom: 15px;
    }
    
    .users {
      display: flex;
    }
    
    .user-details-wrapper {
      margin-left: 15px;
      padding-left: 15px;
      border-left: 1px solid lightgray;
    }
    
    .users-list-wrapper {
      position: relative;
    }
    
    .loader {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: white;
      opacity: 0.5;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    .users-list {
      margin: 0;
      padding: 0;
      list-style: none;
      min-width: 300px;
    }
    
    .users-list li {
      padding: 15px 20px 15px 0;
      cursor: pointer;
    }
    
    .users-list li a {
      text-decoration: none;
      color: #555555;
    }
    
    .users-list li:hover {
      background-color: #f7f7f7;
    }
    
    .users-list li:active {
      background-color: #e8e8e8;
    }
    
    .users-list li.selected {
      font-weight: bold;
      background-color: #e8e8e8;
      padding-left: 20px;
    }
    
    .users-list li:not(:first-child) {
      border-top: 1px solid lightgray;
    }
    
    .user-details-wrapper {
      flex: 1;
    }
    
    .user-details-table {
      width: 100%;
      table-layout: fixed;
    }
    
    .user-details-table td {
      padding: 10px 20px 10px 0;
      font-size: 18px;
    }
    
    .user-details-table td:nth-child(3) {
      padding-left: 15px;
    }
    
    .user-details-table td:nth-child(even) {
      font-weight: bold;
    }          

```

## Workshop storyline 
This workshop is divided into small branches built one on top of each other where each branch represent the next part of the story.
You can find the detailed files comparison between all the branches.
 
[Intuit](https://github.intuit.com/pages/rshemesh/next-ssr-workshop/)

[Public](https://royeeshemesh.github.io/next-ssr-workshop/)
