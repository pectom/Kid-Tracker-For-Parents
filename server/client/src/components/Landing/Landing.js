import React from 'react';
import Logging from './Logging';
import Register from './Register';
import SneakPeak from './SneakPeak';

class Landing extends React.Component {
    state = {
        logOrReg: 'log'
    };

    changeLogOrRegister = (newState) => {
        this.setState({
            logOrReg: newState
        });
    }

    renderLogOrReg(logOrReg) {
        const logText = logOrReg === 'log' ? "active" : "";
        const regText = logOrReg === 'reg' ? "active" : "";
        return (
            <div className="ui segment">
                <div className="ui top attached tabular menu">
                    <button className={`item ${logText}`} onClick={() => this.changeLogOrRegister('log')} >
                        Logowanie
                    </button>
                    <button className={`item ${regText}`} onClick={() => this.changeLogOrRegister('reg')} >
                        Rejestracja
                    </button>
                </div>
                <div className="ui bottom attached segment">
                    {logOrReg === 'log' ? <Logging /> : <Register />}
                </div>
            </div>
        );
    }

    render() {
        return (
            <div>
                <div className="ui segment" style={{textAlign: 'center', fontSize: 30}}>
                    <i className="map marker alternate icon big" />
                    GdzieJestMojeDziecko?
                </div>
                <div className="ui grid">
                    <div className="eight wide column">
                        <SneakPeak />
                    </div>
                    <div className="eight wide column">
                        {this.renderLogOrReg(this.state.logOrReg)}
                    </div>
                </div>
            </div>
        );
    }
}

export default Landing;