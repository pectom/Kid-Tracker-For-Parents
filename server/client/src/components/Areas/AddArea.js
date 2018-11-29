import React from 'react';
import { Modal, Dropdown } from 'semantic-ui-react';

class AddArea extends React.Component {
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
        console.log("Add area");
        this.close();
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

    childOptions = [
        {
            text: 'Jessica',
            value: 'Jessica',
        },
        {
            text: 'Brajan',
            value: 'Brajan',
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
                            <label>Nazwa i ikona</label>
                            <div className="two fields">
                                <div className="field">
                                    <input name="name" type="text" placeholder="Nazwa" />
                                </div>
                                <div className="field">
                                    <Dropdown placeholder='Ikona' fluid selection options={this.iconOptions} />
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <label>Lokalizacja</label>
                            <div className="two fields">
                                <div className="field">
                                    <input name="lat" type="text" placeholder="Szerokość geograficzna" />
                                </div>
                                <div className="field">
                                    <input name="lon" type="text" placeholder="Długość geograficzna" />
                                </div>
                                <div className="field">
                                    <input name="rad" type="text" placeholder="Promień obszaru" />
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <label>Dzieci</label>
                            <Dropdown placeholder='Dzieci' fluid multiple selection options={this.childOptions} />
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

export default AddArea;