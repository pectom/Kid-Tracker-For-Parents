import React from 'react';
import Header from '../Header';
import Sidebar from './Sidebar';
import Map from '../Map';
import { GoogleApiWrapper } from 'google-maps-react';

class Dashboard extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <div className="ui grid">
                    <div className="ui five wide column">
                        <Sidebar />
                    </div>
                    <div className="ui eleven wide column">
                        <Map />
                    </div>
                </div>
            </div>
        );
    }
}
export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_KEY,
    language: "pl"
  })(Dashboard);