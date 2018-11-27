import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
    render() {
        return (
            <div className="ui menu">
                <Link className="item" to="/dashboard">
                    <i className="map marker alternate icon big" />
                    GdzieJestMojeDziecko?
                </Link>
                <div className="right menu">
                    <div className="item">
                        <Link className="ui standard button" to="/children">Dzieci</Link>
                    </div>
                    <div className="item">
                        <Link className="ui standard button" to="/areas">Obszary</Link>
                    </div>
                    <div className="item">
                        <Link className="ui standard button" to="/rules">Reguły</Link>
                    </div>
                    <div className="item">
                        <Link className="ui primary button" to="/">Wyloguj</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;