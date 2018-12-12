import React from 'react';
import Header from '../Header';
import Sidebar from './Sidebar';
import Map from '../Map';
import { Marker, Circle } from 'react-google-maps';
import { GoogleApiWrapper } from 'google-maps-react';

import { connect } from 'react-redux';

import * as actions from '../../actions';


class Areas extends React.Component {
    componentDidMount() {
        this.props.fetchAreas();
    }

    renderMarkers() {
        return this.props.areas ? this.props.areas.map( area => {
            return (
                <Marker
                    key={area._id}
                    position={{
                        lat: area.coordinates ? area.coordinates[0] : 0,
                        lng: area.coordinates ? area.coordinates[1] : 0
                    }}
                    text={area.name}
                    label={area.name}
                    icon={"Nothing here"}
                />
            )
        }) : [];
    }

    renderCircles() {
        return this.props.areas ? this.props.areas.map( area => {
            return (
                <Circle
                    key={area._id}
                    center={{
                        lat: area.coordinates ? area.coordinates[0] : 0,
                        lng: area.coordinates ? area.coordinates[1] : 0
                    }}
                    radius={area.radius ? area.radius : 0}
                />
            )
        }) : [];
    }

    render() {
        return (
            <div>
                <Header />
                <div className="ui grid">
                    <div className="ui five wide column">
                        <Sidebar />
                    </div>
                    <div id='react-map' className="ui eleven wide column" style={{height: '100vh', width: '100%'}}>
                        <Map 
                            markers={this.renderMarkers()}
                            circles={this.renderCircles()}
                            google={this.props.google}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ areas }) => {
    return {
        areas
    };
};

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_KEY,
    language: "pl"
  })(connect(mapStateToProps, actions)(Areas));