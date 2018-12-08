import React from 'react';
import Header from '../Header';
import Sidebar from './Sidebar';
import Map from '../Map';

import { connect } from 'react-redux';

import * as actions from '../../actions';
import { Marker, Circle } from 'google-maps-react';

class Areas extends React.Component {
    componentDidMount() {
        this.props.fetchAreas();
    }

    renderMarkers() {
        return this.props.areas ? this.props.areas.map( area => {
            return (
                <Marker
                    key={area._id}
                    title={area.name} 
                    position={{
                        lat: area.coordinates ? area.coordinates[0] : 0,
                        lng: area.coordinates ? area.coordinates[1] : 0
                    }}
                    label={area.name}
                />
            );
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
                    radius={area.radius}
                />
            );
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
                    <div className="ui eleven wide column">
                        <Map pins={this.renderMarkers()} circles={this.renderCircles()} />
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

export default connect(mapStateToProps, actions)(Areas);