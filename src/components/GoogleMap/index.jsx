import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'

function Map () {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        defaultZoom={11}
        defaultCenter={ {lat: 53.472225, lng: -2.2935019} }
      />
    </div>
  )
}

export default Map