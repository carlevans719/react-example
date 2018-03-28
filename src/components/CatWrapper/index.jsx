import React, { Component } from 'react'
import CatImage from '../CatImage'

class CatWrapper extends Component {
  render () {
    return (
      <CatImage image="https://picsum.photos/1000/1500/?gravity=east" />
    )
  }
}

export default CatWrapper
