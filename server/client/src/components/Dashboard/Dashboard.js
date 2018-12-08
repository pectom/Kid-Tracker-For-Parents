import React from 'react';
import Header from '../Header';
import Sidebar from './Sidebar';

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
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;