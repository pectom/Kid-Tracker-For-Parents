import React from 'react';
import { Map, GoogleApiWrapper, Circle } from 'google-maps-react';
import Loading from './Loading';

const mapStyles = {
    width: '96%',
    height: '95%'
};

const Circle = new google.maps.Circle({
    center: {
        lat: 50.06707103,
        lng: 19.91332054
    },
    radius: 150
});

export class MapContainer extends React.Component {
    render() {
        return (
            <div className="ui segment" style={{height: 500}}>
                <Map
                    google={this.props.google}
                    zoom={15}
                    style={mapStyles}
                    initialCenter={{
                        lat: 50.06707103,
                        lng: 19.91332054
                    }}
                >
                    {this.props.pins}
                    {Circle}
                </Map>
            </div>
        ); 
    }
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_KEY,
    language: 'PL',
    LoadingContainer: Loading
})(MapContainer); 