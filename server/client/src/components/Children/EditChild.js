import React from 'react';
import { Modal, Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';

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
            iconColor: data.value
        });
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
                    <button id={`edit-child-${this.props.id}`} className="ui icon button" data-tooltip="Edytuj dane dziecka" onClick={() => this.open()}>
                                <i className="edit icon" />
                    </button>
                }
            >
                <Modal.Header>Edytuj dane dziecka</Modal.Header>
                <Modal.Content>
                    <form className="ui form">
                        <div className="field">
                            <label>Nazwa</label>
                            <div className="two fields">
                                <div className="field">
                                    <input
                                        id={`edit-child-name-${this.props.id}`}
                                        name="name" 
                                        type="text" 
                                        value={this.state.name} 
                                        onChange={e => this.handleNameChange(e)} 
                                    />
                                </div>
                                <div className="field">
                                    <Dropdown
                                        id={`edit-child-iconColor-${this.props.id}`}
                                        value={this.state.iconColor} 
                                        fluid selection 
                                        options={this.colorOptions} 
                                        onChange={(e,data) => this.handleIconColorChange(data)}
                                    />
                                </div>
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