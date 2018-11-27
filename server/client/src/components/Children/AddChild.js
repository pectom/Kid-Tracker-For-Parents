import React from 'react';
import { Modal, Dropdown } from 'semantic-ui-react';

class AddChild extends React.Component {
    state = {
        open: false
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

    handleClick = () => {
        console.log("Add child");
        this.close();
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
    ]

    render() {
        return (
            <Modal
                size="tiny"
                open={this.state.open}
                onClose={() => this.close()}
                trigger={
                    <button className="circular ui icon button blue" data-tooltip="Dodaj dziecko" onClick={() => this.open()}>
                        <i className="icon plus large"></i>
                    </button>
                }
            >
                <Modal.Header>Dodaj dziecko</Modal.Header>
                <Modal.Content>
                    <form className="ui form">
                        <div className="field">
                            <label>Nazwa</label>
                            <div className="two fields">
                                <div className="field">
                                    <input name="name" type="text" placeholder="Imię" />
                                </div>
                                <div className="field">
                                    <Dropdown placeholder='Kolor ikonki' fluid selection options={this.colorOptions} />
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <label>Token z aplikacji dziecka</label>
                            <input name="token" type="text" />
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

export default AddChild;