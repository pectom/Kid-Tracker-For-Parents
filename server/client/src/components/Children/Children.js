import React from 'react';
import Header from '../Header';
import Sidebar from './Sidebar';
import Map from '../Map';
import { GoogleApiWrapper } from 'google-maps-react';
import { Marker, InfoWindow } from 'react-google-maps';

import { connect } from 'react-redux';

import * as actions from '../../actions'; 


class Children extends React.Component {
    componentDidMount(){
        this.props.fetchChildren();
    }

    renderMarkers() {
        return this.props.children ? this.props.children.map( child => {
            return (
                <Marker
                    key={child._id}
                    label={{
                        text: child.name ? child.name[0] : '',
                        fontSize: '20px',
                        color: 'white'
                    }}
                    icon={
                        {
                            path: 0,
                            scale: 15,
                            fillColor: child.iconColor,
                            fillOpacity: 0.6,
                            strokeOpacity: 0
                        }
                    }
                    position={{lat: child.location ? child.location.coordinates[1] : 0, lng: child.location ? child.location.coordinates[0] : 0}}
                >
                    {
                        <InfoWindow>
                            <div>{`Czas pomiaru: ${child.locationTime ? child.locationTime.substr(0,10) : ''} ${child.locationTime ? child.locationTime.substr(11,5) : ''}`}</div>
                        </InfoWindow>
                    }
                </Marker>
            )
        }) : [];
    }

    render() {
        return (
            <div>
                <Header />
                <div className="ui stackable grid">
                    <div className="ui five wide column">
                        <Sidebar />
                    </div>
                    <div className="ui eleven wide column">
                        <Map markers={this.renderMarkers()}/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ children }) => {
    return {
        children
    };
};

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_KEY,
    language: "pl"
  })(connect(mapStateToProps, actions)(Children));