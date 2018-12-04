import React from 'react';
import Header from '../Header';
import Sidebar from './Sidebar';
import Map from '../../Map';

class Areas extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <div className="ui grid">
                    <div className="ui five wide column">
                        <Sidebar />
                    </div>
                    <div className="ui eleven wide column">
                        <Map mapSrc="https://www.openstreetmap.org/export/embed.html?bbox=19.77857360839844%2C50.01939873027272%2C20.059912109375003%2C50.07425960242971" />
                    </div>
                </div>
            </div>
        );
    }
}

export default Areas;