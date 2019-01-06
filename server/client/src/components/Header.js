import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../actions';

class Header extends React.Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    handleDelete = async () => {
        await this.props.deleteAccount();
        await this.props.fetchUser();
    }

    render() {
        if(this.props.auth === false) {
            return <Redirect to='/'/>;
        } else if (this.props.auth === null) {
            return (
                <div className="ui active inverted dimmer">
                    <div className="ui large text loader">Ładowanie</div>
                </div>
            );
        }
        return (
            <div className="ui stackable menu">
                <Link id="header-logo" className="item" to="/dashboard">
                    <i className="map marker alternate icon big" />
                    GdzieJestMojeDziecko?
                </Link>
                <button style={{margin:0, padding:0, visibility: 'hidden', width:0, height:0, border:0}} id="header-delete" onClick={() => this.handleDelete()}></button>
                <div className="right menu">
                        <Link id="header-children" className="item" to="/children">Dzieci</Link>
                        <Link id="header-areas" className="item" to="/areas">Obszary</Link>
                        <Link id="header-rules" className="item" to="/rules">Reguły</Link>
                        <a id="header-logout" className="item" href="/api/logout">Wyloguj</a>
                </div>
                
            </div>
            
        );
    }
}

const mapStateToProps = ({ auth, account }) => {
    return { auth, account };
};

export default connect(mapStateToProps, actions)(Header);