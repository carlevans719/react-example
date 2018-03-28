# React Example

## Getting started

Create a project folder
`mkdir react-example`

Navigate into the folder and initialise a new project
`cd react-example && npm init`
(feel free to hit enter through the whole process)


### Add public files

Make a folder to put your html page:
`mkdir public`

Now create an index.html in it:
`touch public/index.html`

Add the skeleton to index.html:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>React Example</title>
  </head>

  <body>
    <!-- This is where the app will be rendered -->
    <div id='app'></div>

    <!-- This is the bundled app -->
    <script src='/app.js'></script>
  </body>
</html>
```

### Add app files

Next, make a folder to put your app code:
`mkdir src`

Create an index.js in the src folder:
`touch src/index.js`


Add the app boilerplate to index.js:

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import CatImage from './components/CatImage.jsx'

ReactDOM.render(<CatImage />, document.getElementById('app'))
```

There are a few things going on here:

- we import React and ReactDOM from their respective packages
- we import one of our own react components from ./components/CatImage.jsx
- we grab the `<div id="app">` from the DOM and render our component into it

Notice the JSX syntax in that final step. Also note that this is the first and, most likely, last time we'll be interacting directly with the DOM.

Add the packages referenced above:
`npm i --save react react-dom`


### Add the CatImage component

Make the components folder and the CatImage file:
`mkdir src/components && touch src/components/CatImage.jsx`

Add the code for the CatImage component:

```jsx
import React from 'react'

function CatImage () {
  return (
    <div className="cat-image">
      <img src="https://placekitten.com/1000/1500" />
    </div>
  )
}

export default CatImage
```

At its most basic, a react component is simply a function which returns some markup.
Notice that the usual html attribute "class" becomes "className" in react (also "for" becomes "htmlFor"). This is because these words are reserved words in javascript.
Also notice that the `<img>` has been self-closed. All elements must self-close or have a closing tag.

- - -

## Building

### Transpiling

Up until now, we have enjoyed writing using modern javascript syntax. This requires babel to be possible. 

Add a .babelrc to specify the babel config:
`touch .babelrc`

Add the following to the .babelrc:

```json
{
  "presets": [
    "react",
    "es2015"
  ]
}
```

Now add the babel package:
`npm i --save-dev babel-cli babel-preset-react babel-preset-es2015`

Notice that we add the react preset and the es2015 preset because we specified them in our .babelrc.

### Bundling

The app is bundled by webpack.

Make a file to store the webpack configuration:
`touch webpack.config.js`

Add the basic config:

```js
var webpack = require('webpack')
var path = require('path')

module.exports = {
  // This is the app's entrypoint
  entry: path.resolve(__dirname, 'src/index.js'),

  // The environment to use defaults for
  mode: 'development',

  // Where the bundled code will be output
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'app.js'
  },

  devServer: {
    // The "webroot" of the app during development
    contentBase: path.resolve(__dirname, 'public')
  },

  module: {
    // Rules describe the action(s) to perform on matching files
    rules: [{
      test: /\.jsx?$/,             // Any files that end .js(x)
      exclude: /node_modules/,     // except those in a node_modules directory
      use: [{
        loader: 'babel-loader'     // Use the babel-loader to process
      }]
    }]
  }
}
```

In the above file, we reference the babel-loader, path and webpack. Install them now:

- `npm i --save-dev babel-loader path`
- `npm i -g webpack webpack-cli`

This loader tells webpack to use babel to process javascript files when it is bundling the app

- - -

## Running

Add a convenience script to your package.json:

```json
  "scripts": {
    "start": "webpack-dev-server"
  }
```

Install the package globally:
`npm i -g --save-dev webpack-dev-server`

And you can now run `npm start` to run your app! Visit http://localhost:8080 to verify that it's working.

Have a look inside `<div id="app">`.


# Next Steps

## CSS

There are two steps:

- define the rules in webpack.config.js
- import the css where it is needed

### webpack.config.js

```js
{
  test: /\.css$/,              // Any files that end .css
  exclude: /node_modules/,     // except those in a node_modules directory
  use: [{
    loader: 'style-loader',    // Use the style-loader
  }, {
    loader: 'css-loader'       // and the css-loader to process
  }]
}
```

Install the packages:
`npm i --save-dev style-loader css-loader`

Given the following folder structure:

```shell
components/
  CatImage/
  | CatImage.jsx
  | CatImage.css
```

Change the top of CatImage.jsx to the following:

```jsx
import React from 'react'

import './CatImage.css'

function CatImage () {
// ...
```

- - -

## Stateful components

To add state to your components, use the class syntax:

```jsx
import React, { Component } from 'react'

import './CatImage.css'

class CatImage extends Component {
  // Member (instance) variable called state
  state: {
    src: 'https://placekitten.com/1000/1500'
  }

  render () {
    return (
      <div className="cat-image">
        {/* The <img>'s "src" will be set to the value of this.state.src */}
        <img src={this.state.src} />
      </div>
    )
  }
}

export default CatImage
```

**Never assign directly to `this.state`. Always use `this.setState({key: value})`**

- - -

## Props

Consider the following component:

```jsx
function CatWrapper () {
  return <CatImage image="https://picsum.photos/1000/1500/?gravity=east" />
}
```

To access the value of `image` ("https://picsum.photos/1000/1500/?gravity=east") inside `<CatImage>`, modify it as follows:

```jsx
class CatImage extends Component {
  render () {
    return (
      <div className="cat-image">
        <img src={this.props.image} />
      </div>
    )
  }
}
```

- - -

## Logic

Following on from the above example, we could toggle between placekitten.com and picsum.photos onclick by changing CatImage as follows:

```jsx
class CatImage extends Component {
  constructor (props, context) {
    super(props, context)

    this.state = {
      src: 'https://placekitten.com/1000/1500',
      usingPropSrc: false
    }
  }

  // NOTICE: this "method" is actually an arrow-function defined inside the class, ASSIGNED to
  // a prop called onClick. This is vital to ensure the correct `this` context.
  //
  // Do this for any method which isn't a react component builtin (render, onComponentDidMount, etc...)
  // or the constructor.
  onClick = (event) => {
    // Toggle the value of usingPropSrc
    this.setState({usingPropSrc: !this.state.usingPropSrc})
  }

  render () {
    const imgSrc = this.state.usingPropSrc
      ? this.props.image
      : this.state.src

    return (
      <div className="cat-image">
        {/* bind the onClick event of the img to this.onClick */}
        <img src={imgSrc} onClick={this.onClick} />
      </div>
    )
  }
}
```
