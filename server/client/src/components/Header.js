import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Header extends React.Component {
    componentDidMount() {
        this.props.fetchUser();
    }

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
                        <a className="ui primary button" href="/api/logout">Wyloguj</a>
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