import React from 'react';
import { Modal, Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

class AddChild extends React.Component {
    state = {
        open: false,
        name: '',
        iconColor: 'red',
        token: ''
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
        await this.props.createChild({
            user: this.props.auth._id,
            name: this.state.name,
            iconColor: this.state.iconColor,
        });
        this.props.fetchChildren();
        this.close();
    }

    handleNameChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    handleTokenChange = (e) => {
        this.setState({
            token: e.target.value
        })
    }

    handleIconColorChange = (data) => {
        this.setState({
            iconColor: data.value
        })
    }

    colorOptions = [
        {
            text: 'czerwony',
            value: 'red',
            icon: {
                name:'',
                circular: true,
                color: 'red',
                inverted: true,
                size: 'tiny'
            }
        },
        {
            text: 'niebieski',
            value: 'blue',
            icon: {
                name:'',
                circular: true,
                color: 'blue',
                inverted: true,
                size: 'tiny'
            }
        },
    ]

    render() {
        return (
            <Modal
                size="tiny"
                open={this.state.open}
                onClose={() => this.close()}
                trigger={
                    <button id="add-child-button" className="circular ui icon button blue" data-tooltip="Dodaj dziecko" onClick={() => this.open()}>
                        <i className="icon plus large"></i>
                    </button>
                }
            >
                <Modal.Header>Dodaj dziecko</Modal.Header>
                <Modal.Content>
                    <form className="ui form">
                        <div className="field">
                            <div className="two fields">
                                <div className="field">
                                    <label>Nazwa</label>
                                    <input id="add-child-name" name="name" type="text" value={this.state.name} onChange={(e) => this.handleNameChange(e)} />
                                </div>
                                <div className="field">
                                    <label>Kolor ikonki</label>
                                    <Dropdown 
                                        id="add-child-iconColor" 
                                        value={this.state.iconColor} 
                                        fluid selection 
                                        options={this.colorOptions} 
                                        onChange={(e,data) => this.handleIconColorChange(data)} 
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <label>Token z aplikacji dziecka</label>
                            <input id="add-child-token" name="token" type="text" value={this.state.token} onChange={(e) => this.handleTokenChange(e)} />
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
const mapStateToProps = ({ children, auth }) => {
    return { children, auth };
}

export default connect(mapStateToProps, actions)(AddChild);