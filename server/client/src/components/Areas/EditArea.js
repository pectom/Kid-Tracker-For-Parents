import React from 'react';
import { Modal, Dropdown } from 'semantic-ui-react';

class EditArea extends React.Component {
    state = {
        open: false,
        name: this.props.name,
        icon: this.props.icon,
        kidsNames: this.props.kidsNames,
        lat: this.props.lat,
        lon: this.props.lon,
        rad: this.props.rad 
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
            icon: 'home icon small'
        },
        {
            text: 'budynek',
            value: 'building',
            icon: 'building icon small'
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
        {
            text: 'Sebastian',
            value: 'Sebastian',
        }
    ]

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
                                value={this.state.kidsNames} 
                                fluid multiple selection 
                                options={this.childOptions} 
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

export default EditArea;