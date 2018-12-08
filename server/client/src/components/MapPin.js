import React from 'react';
import { Marker } from 'google-maps-react';

export default class MapPin extends React.Component {
  render() {
      return (
        <Marker
            position={{
                lat: this.props.lat,
                lng: this.props.lon
            }}
            title={this.props.title}
        />
      )
  }

}