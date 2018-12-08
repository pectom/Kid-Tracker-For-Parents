import React from 'react';
import Header from '../Header';
import Map from '../Map';
import Sidebar from './Sidebar';

class Children extends React.Component {
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

export default Children;