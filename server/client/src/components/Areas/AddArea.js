import React from 'react';
import { Modal, Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

class AddArea extends React.Component {
    componentDidMount() {
        this.props.fetchChildren();
    }

    state = {
        open: false,
        name: '',
        iconId: 'home',
        latitude: 0,
        longitude: 0,
        radius: 100,
        children: []
    }

    close = () => {
        this.setState({
            open: false
        })
    }

    open = () => {
        this.setState({
            open: true
        })
    }

    handleClick = async () => {
        await this.props.createArea({
            name: this.state.name,
            iconId: this.state.iconId,
            longitude: this.state.longitude,
            latitude: this.state.latitude,
            radius: this.state.radius,
            children: this.state.children
        });
        await this.props.fetchAreas();
        this.close();
    }

    handleNameChange = e => {
        this.setState({
            name: e.target.value
        });
    }

    handleIconIdChange = data => {
        this.setState({
            iconId: data.value
        });
    }

    handleLatitudeChange = e => {
        this.setState({
            latitude: e.target.value
        });
    }

    handleLongitudeChange = e => {
        this.setState({
            longitude: e.target.value
        });
    }

    handleRadiusChange = e => {
        this.setState({
            radius: e.target.value
        });
    }

    handleChildrenChange = data => {
        this.setState({
            children: data.value
        });
    }

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

    render() {
        return (
            <Modal
                size="tiny"
                open={this.state.open}
                onClose={() => this.close()}
                trigger={
                    <button className="circular ui icon button blue" data-tooltip="Dodaj obszar" onClick={() => this.open()}>
                        <i className="icon plus large"></i>
                    </button>
                }
            >
                <Modal.Header>Dodaj obszar</Modal.Header>
                <Modal.Content>
                    <form className="ui form">
                        <div className="field">
                            
                            <div className="two fields">
                                <div className="field">
                                    <label>Nazwa</label>
                                    <input name="name" type="text" value={this.state.name} onChange={(e) => this.handleNameChange(e)} />
                                </div>
                                <div className="field">
                                    <label>Ikona</label>
                                    <Dropdown value={this.state.iconId} onChange={(e, data) => this.handleIconIdChange(data)} fluid selection options={this.iconOptions} />
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <label>Lokalizacja</label>
                            <div className="two fields">
                                <div className="field">
                                    <label>Szerokość geograficzna</label>
                                    <input name="lat" type="text" value={this.state.latitude} onChange={(e) => this.handleLatitudeChange(e)} />
                                </div>
                                <div className="field">
                                    <label>Długość geograficzna</label>
                                    <input name="lon" type="text" value={this.state.longitude} onChange={(e) => this.handleLongitudeChange(e)} />
                                </div>
                                <div className="field">
                                    <label>Promień</label>
                                    <input name="rad" type="text" value={this.state.radius} onChange={(e) => this.handleRadiusChange(e)} />
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <label>Dzieci</label>
                            <Dropdown 
                                value={this.state.children} 
                                onChange={(e, data) => this.handleChildrenChange(data)} 
                                fluid multiple selection 
                                options={this.prepareChildrenOptions()} 
                            />
                        </div>
                        
                    </form>
                </Modal.Content>
                <Modal.Actions>
                    <button className="ui button green" onClick={() => this.handleClick()}>Dodaj</button>
                </Modal.Actions>
            </Modal>
        );
    }
}

const mapStateToProps = ({ areas, children }) => {
    return {
        areas,
        children
    };
};

export default connect(mapStateToProps, actions)(AddArea);