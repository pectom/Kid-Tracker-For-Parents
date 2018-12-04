import React from 'react';
import { Modal, Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

class EditArea extends React.Component {
    state = {
        open: false,
        name: this.props.name,
        icon: this.props.icon,
        lat: this.props.lat,
        lon: this.props.lon,
        rad: this.props.rad 
    }

    componentDidMount() {
        this.props.fetchChildren();
    }

    close = () => {
        this.setState({
            open: false
        })
    }

    open = () => {
        this.setState({
            myChildren: this.props.myChildren.map(child => child.id)
        })
        this.setState({
            open: true
        })
    }

    handleSaveClick = () => {
        console.log("Edit area");
        this.close();
    }

    handleNameChange = e => {
        this.setState({
            name: e.target.value
        });
    }

    handleIconChange = data => {
        this.setState({
            icon: data.value
        });
    }

    handleLatChange = e => {
        this.setState({
            lat: e.target.value
        });
    }

    handleLonChange = e => {
        this.setState({
            lon: e.target.value
        });
    }

    handleRadChange = e => {
        this.setState({
            rad: e.target.value
        });
    }

    handleKidChange = data => {
        this.setState({
            kidsNames: data.value
        });
    }

    iconOptions = [
        {
            text: 'dom',
            value: 'home',
            icon: 'home'
        },
        {
            text: 'budynek',
            value: 'building',
            icon: 'building'
        },
    ]

    prepareChildrenOptions = () => {
        const children = this.props.children ? this.props.children : [];
        return children.map( child => {
            return {
                text: child.name,
                value: child._id,
                icon: {
                    name:'',
                    circular: true,
                    color: child.iconColor,
                    inverted: true,
                    size: 'tiny'
                }
            }
        })
    }

    render() {
        return (
            <Modal
                size="tiny"
                open={this.state.open}
                onClose={() => this.close()}
                trigger={
                    <button className="ui icon button" data-tooltip="Edytuj obszar" onClick={() => this.open()}>
                                <i className="edit icon" />
                    </button>
                }
            >
                <Modal.Header>Edytuj obszar</Modal.Header>
                <Modal.Content>
                    <form className="ui form">
                        <div className="field">
                            <label>Nazwa i ikona</label>
                            <div className="two fields">
                                <div className="field">
                                    <input
                                        name="name" 
                                        type="text" 
                                        value={this.state.name} 
                                        onChange={e => this.handleNameChange(e)} 
                                    />
                                </div>
                                <div className="field">
                                    <Dropdown 
                                        value={this.state.icon} 
                                        fluid selection 
                                        options={this.iconOptions} 
                                        onChange={(e,data) => this.handleIconChange(data)} 
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <label>Lokalizacja</label>
                            <div className="two fields">
                                <div className="field">
                                    <input name="lat" type="text" value={this.state.lat} onChange={e => this.handleLatChange(e)} />
                                </div>
                                <div className="field">
                                    <input name="lon" type="text" value={this.state.lon} onChange={e => this.handleLonChange(e)} />
                                </div>
                                <div className="field">
                                    <input name="rad" type="text" value={this.state.rad} onChange={e => this.handleRadChange(e)} />
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <label>Dzieci</label>
                            <Dropdown 
                                value={this.state.myChildren} 
                                fluid multiple selection 
                                options={this.prepareChildrenOptions()} 
                                onChange={(e, data) => { this.handleKidChange(data)} }
                            />
                        </div>
                        
                    </form>
                </Modal.Content>
                <Modal.Actions>
                    <button className="ui button green" onClick={() => this.handleSaveClick()}>Zapisz</button>
                </Modal.Actions>
            </Modal>
        );
    }
}

const mapStateToProps = ({ children }) => {
    return {
        children
    }
}

export default connect(mapStateToProps, actions)(EditArea);