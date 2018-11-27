import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Landing from './Landing/Landing';
import Dashboard from './Dashboard/Dashboard';
import Children from './Children/Children';
import Areas from './Areas/Areas';
import Rules from './Rules/Rules';

class App extends React.Component {
    render() {
        return (
            <div className="ui container"  style={{marginTop: '10px'}}>
                <BrowserRouter>
                    <div className="container">
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/dashboard" component={Dashboard} />
                        <Route exact path="/children" component={Children} />
                        <Route exact path="/areas" component={Areas} />
                        <Route exact path="/rules" component={Rules} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;