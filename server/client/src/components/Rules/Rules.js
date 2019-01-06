import React from 'react';
import Header from '../Header';
import Sidebar from './Sidebar';
import Map from '../Map';
import { Polygon, Marker } from 'react-google-maps';
import { GoogleApiWrapper } from 'google-maps-react';

import { connect } from 'react-redux';

import * as actions from '../../actions';


class Rules extends React.Component {
    componentDidMount() {
        this.props.fetchAreas();
    }

    renderPolygons() {
        return this.props.areas ? this.props.areas.map( area => {
            return (
                <Polygon
                    key={area._id}
                    paths={area.location && area.location.coordinates ? area.location.coordinates : [{lat:0.1,lng:0.1}]}
                />
            );
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
                    position={area.location ? area.location.coordinates[0]: {lat:0, lng:0}}
                />
            )
        }) : [];
    }

    render() {
        return(
            <div>
                <Header />
                <div className="ui stackable grid">
                    <div className="ui five wide column">
                        <Sidebar />
                    </div>
                    <div className="ui eleven wide column">
                        <Map 
                            polygons={this.renderPolygons()}
                            markers={this.renderMarkers()}
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
  })(connect(mapStateToProps, actions)(Rules));