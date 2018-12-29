import React from 'react';
import Header from '../Header';
import Sidebar from './Sidebar';
import Map from '../Map';
import { Polygon, Marker } from 'react-google-maps';
import { GoogleApiWrapper } from 'google-maps-react';

import { connect } from 'react-redux';

import * as actions from '../../actions';


class Areas extends React.Component {
    componentDidMount() {
        this.props.fetchAreas();
    }

    renderPolygons() {
        return this.props.areas ? this.props.areas.map( area => {
            return (
                <Polygon
                    key={area._id}
                    paths={area.location.coordinates}
                    text={area.name}
                    label={area.name}
                    icon={"Nothing here"}
                />
            )
        }) : [];
    }

    renderMarkers() {
        return this.props.areas ? this.props.areas.map( area => {
            return (
                <Marker
                    key={area._id}
                    text={area.name}
                    label={area.name}
                    icon={"Nothing here"}
                    position={area.location.coordinates[0]}
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
                            polygons={this.renderPolygons()}
                            markers={this.renderMarkers()}
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
    language: "pl",
    libraries: ['geometry','drawing','places']
  })(connect(mapStateToProps, actions)(Areas));