import React from 'react';
import { Modal, Dropdown } from 'semantic-ui-react';

class AddRule extends React.Component {
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
            icon: 'home icon small'
        },
        {
            text: 'budynek',
            value: 'building',
            icon: 'building icon small'
        },
    ];

    areaOptions = [
        {
            text: 'Dom',
            value: 1
        },
        {
            text: 'Basen',
            value: 2
        },
    ];

    childOptions = [
        {
            text: 'Jessica',
            value: 'Jessica',
        },
        {
            text: 'Brajan',
            value: 'Brajan',
        },
    ];

    render() {
        return (
            <Modal
                size="tiny"
                open={this.state.open}
                onClose={() => this.close()}
                trigger={
                    <button className="circular ui icon button blue" data-tooltip="Dodaj regułę" onClick={() => this.open()}>
                        <i className="icon plus large"></i>
                    </button>
                }
            >
                <Modal.Header>Dodaj regułę</Modal.Header>
                <Modal.Content>
                    <form className="ui form">
                        <div className="two fields">
                            <div className="field">
                                <label>Data rozpoczęcia</label>
                                <input name="startdate" type="date" />
                            </div>
                            <div className="field">
                                <label>Data zakończenia</label>
                                <input name="enddate" type="date" />
                            </div>
                        </div>
                        <div className="two fields">
                            <div className="field">
                                <label>Czas rozpoczęcia</label>
                                <input name="starttime" type="time" />
                            </div>
                            <div className="field">
                                <label>Czas zakończenia</label>
                                <input name="endtime" type="time" />
                            </div>
                        </div>
                        <div className="field">
                            <label>Obszar</label>
                            <Dropdown placeholder='Obszar' fluid selection options={this.areaOptions} />
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

export default AddRule;