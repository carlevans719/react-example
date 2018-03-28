import React, { Component } from 'react'

import './CatImage.css'

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
  //
  // You will need the babel-preset-stage-0 package installed to do this.
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

export default CatImage