import React from 'react';
import { Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { CirclePicker } from 'react-color';

import * as actions from '../../actions';

class EditChild extends React.Component {
    state = {
        open: false,
        name: this.props.name,
        iconColor: this.props.iconColor
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

    handleSaveClick = async () => {
        await this.props.updateChild({ id: this.props.id, name: this.state.name, iconColor: this.state.iconColor});
        this.props.fetchChildren();
        this.close();
    }

    handleNameChange = e => {
        this.setState({
            name: e.target.value
        });
    }

    handleIconColorChange = data => {
        this.setState({
            iconColor: data.hex
        });
    }

    render() {
        return (
            <Modal
                size="tiny"
                open={this.state.open}
                onClose={() => this.close()}
                trigger={
                    <button id={`edit-child-${this.props.id}`} className="ui icon button" data-tooltip="Edytuj dane dziecka" onClick={() => this.open()}>
                                <i className="edit icon" />
                    </button>
                }
            >
                <Modal.Header>Edytuj dane dziecka</Modal.Header>
                <Modal.Content>
                    <form className="ui form">
                        <div className="field">
                            <div className="field">
                                <label>Imię</label>
                                <input
                                    id={`edit-child-name-${this.props.id}`}
                                    name="name" 
                                    type="text" 
                                    value={this.state.name} 
                                    onChange={e => this.handleNameChange(e)} 
                                />
                            </div>
                            <div className="field">
                                <label>Kolor ikonki</label>
                                <CirclePicker 
                                    color={this.state.iconColor}
                                    onChange={(event) => this.handleIconColorChange(event)}
                                    width='100%'
                                />
                            </div>
                        </div>
                    </form>
                </Modal.Content>
                <Modal.Actions>
                    <button id={`edit-child-saveButton-${this.props.id}`} className="ui button green" onClick={() => this.handleSaveClick()}>Zapisz</button>
                </Modal.Actions>
            </Modal>
        );
    }
}

const mapStateToProps = ({ updateChild, fetchChildren }) => {
    return {
        updateChild,
        fetchChildren
    };
}

export default connect(mapStateToProps, actions)(EditChild);