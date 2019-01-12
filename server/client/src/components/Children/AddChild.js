import React from 'react';
import { Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { CirclePicker } from 'react-color';

import * as actions from '../../actions';

class AddChild extends React.Component {
    state = {
        open: false,
        name: '',
        iconColor: '#f44336',
        code: ''
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
            code: this.state.code
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
            code: e.target.value
        })
    }

    handleIconColorChange = (data) => {
        this.setState({
            iconColor: data.hex
        })
    }

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
                            <label>Imię</label>
                            <input id="add-child-name" name="name" type="text" value={this.state.name} onChange={(e) => this.handleNameChange(e)} />
                        </div>
                        <div className="field">
                            <label>Kolor ikonki</label>
                            <CirclePicker 
                                color={this.state.iconColor}
                                onChange={(event) => this.handleIconColorChange(event)}
                                width='100%'
                            />
                        </div>
                        <div className="field">
                            <label>Token z aplikacji dziecka</label>
                            <input id="add-child-code" name="code" type="text" value={this.state.code} onChange={(e) => this.handleTokenChange(e)} />
                        </div>
                        
                    </form>
                </Modal.Content>
                <Modal.Actions>
                    <button id="save-child-button" className="ui button green" onClick={() => this.handleClick()}>Dodaj</button>
                </Modal.Actions>
            </Modal>
        );
    }
}
const mapStateToProps = ({ children, auth }) => {
    return { children, auth };
}

export default connect(mapStateToProps, actions)(AddChild);