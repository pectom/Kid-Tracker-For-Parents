import React from 'react';
import { Modal, Dropdown } from 'semantic-ui-react';

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

    handleSaveClick = () => {
        console.log("Edit child");
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
            icon: 'circular red inverted icon tiny'
        },
        {
            text: 'niebieski',
            value: 'blue',
            icon: 'circular blue inverted icon tiny'
        },
        {
            text: 'fioletowy',
            value: 'purple',
            icon: 'circular purple inverted icon tiny'
        },
        {
            text: 'zielony',
            value: 'green',
            icon: 'circular green inverted icon tiny'
        },
    ]

    render() {
        return (
            <Modal
                size="tiny"
                open={this.state.open}
                onClose={() => this.close()}
                trigger={
                    <button className="ui icon button" data-tooltip="Edytuj dane dziecka" onClick={() => this.open()}>
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
                                        name="name" 
                                        type="text" 
                                        value={this.state.name} 
                                        onChange={e => this.handleNameChange(e)} 
                                    />
                                </div>
                                <div className="field">
                                    <Dropdown 
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
                    <button className="ui button green" onClick={() => this.handleSaveClick()}>Zapisz</button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default EditChild;