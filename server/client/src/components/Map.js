import React, { Component } from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';

class Map extends Component {
   render() {
        const GoogleMapExample = withGoogleMap(props => {
            return <GoogleMap
                defaultCenter = { { lat: 50.067124,  lng: 19.914019 } }
                defaultZoom = { 15 }
            >
                {this.props.markers}
                {this.props.circles}
            </GoogleMap>
        });
        return(
            <div className="ui segment">
                <GoogleMapExample
                    containerElement={ <div style={{ height: `70vh` }} /> }
                    mapElement={ <div style={{ height: `100%` }} /> }
                />
            </div>
        );
   }
};
export default Map;