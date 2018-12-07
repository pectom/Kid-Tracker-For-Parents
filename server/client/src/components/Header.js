import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../actions';

class Header extends React.Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        if(this.props.auth === false) {
            return <Redirect to='/'/>;
        } else if (this.props.auth === null) {
            return (
                <div className="ui active inverted dimmer">
                    <div className="ui large text loader">Loading</div>
                </div>
            );
        }
        return (
            <div className="ui menu">
                <Link id="header-logo" className="item" to="/dashboard">
                    <i className="map marker alternate icon big" />
                    GdzieJestMojeDziecko?
                </Link>
                <div className="right menu">
                    <div className="item">
                        <Link id="header-children" className="ui standard button" to="/children">Dzieci</Link>
                    </div>
                    <div className="item">
                        <Link id="header-areas" className="ui standard button" to="/areas">Obszary</Link>
                    </div>
                    <div className="item">
                        <Link id="header-rules" className="ui standard button" to="/rules">Reguły</Link>
                    </div>
                    <div className="item">
                        <a id="header-logout" className="ui primary button" href="/api/logout">Wyloguj</a>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    return { auth };
};

export default connect(mapStateToProps, actions)(Header);