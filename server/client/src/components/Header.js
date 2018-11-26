import React from 'react';

class Header extends React.Component {
    render() {
        return (
            <div className="ui menu">
                <a className="item" href="/dashboard">
                    <i className="map marker alternate icon big" />
                    GdzieJestMojeDziecko?
                </a>
                <div className="right menu">
                    <div className="item">
                        <a className="ui standard button" href="/children">Dzieci</a>
                    </div>
                    <div className="item">
                        <div className="ui standard button">Obszary</div>
                    </div>
                    <div className="item">
                        <a className="ui primary button" href="/">Wyloguj</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;