import React from 'react';
import { Modal, Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import AreaChooser from './AreaChooser';

class AddArea extends React.Component {
    componentDidMount() {
        this.props.fetchChildren();
    }

    state = {
        open: false,
        choosingArea: false,
        name: '',
        iconId: 'home',
        area: {},
        children: [],
        childrenError: false,
        nameError: false
    }

    close = () => {
        this.setState({
            open: false,
            choosingArea: false
        })
    }

    open = () => {
        this.setState({
            open: true
        })
    }

    handleNextButton = async () => {
        await this.checkChildren();
        await this.checkName();
        if(!this.state.childrenError && !this.state.nameError){
            this.setState({
                choosingArea: true
            });
        }
    }

    handleBackButton = () => {
        this.setState({
            choosingArea: false
        })
    }

    handleAreaComplete = async (area) => {
        this.setState({
            area: area,
        });
        await this.makeRequest();
        this.setState({
            open: false,
            choosingArea: false,
            name: '',
            iconId: 'home',
            area: {},
            children: []
        });
        await this.props.fetchAreas();
        this.close();
    }

    makeRequest = async () => {
        await this.props.createArea({
            name: this.state.name,
            iconId: this.state.iconId,
            children: this.state.children,
            area: this.state.area
        });  
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
                value: child._id
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
        {
            text: 'praca',
            value: 'briefcase',
            icon: 'briefcase'
        },
        {
            text: 'książka',
            value: 'book',
            icon: 'book'
        },
    ]

    checkChildren = () => {
        if(this.state.children.length === 0) {
            this.setState({
                childrenError: true
            });
        }
        else {
            this.setState({
                childrenError: false
            });
        }
    }

    checkName = () => {
        if(this.state.name.length === 0) {
            this.setState({
                nameError: true
            });
        }
        else {
            this.setState({
                nameError: false
            });
        }
    }

    renderModal = () => {
        if(this.state.choosingArea) {
            return (
                <AreaChooser handleAreaComplete={(area) => this.handleAreaComplete(area)} />
            );
        }
        else {
            return (
                    <Modal.Content>
                        <form className="ui form">
                            <div className="field">
                                
                                <div className="two fields">
                                    <div className="field">
                                        <label>Nazwa</label>
                                        <input 
                                            id="area-addArea-name" 
                                            name="name" 
                                            type="text" 
                                            value={this.state.name} 
                                            onChange={(e) => this.handleNameChange(e)} 
                                        />
                                        <div id={`alert-addArea-badName`} className="ui red message" style={{display: this.state.nameError ? "block" : "none"}}>
                                            Wpisz nazwę obszaru
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label>Ikona</label>
                                        <Dropdown 
                                            id="area-addArea-icon" 
                                            value={this.state.iconId} 
                                            onChange={(e, data) => this.handleIconIdChange(data)} 
                                            fluid selection 
                                            options={this.iconOptions} 
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="field">
                                <label>Dzieci</label>
                                <Dropdown
                                    id="area-addArea-children" 
                                    value={this.state.children} 
                                    onChange={(e, data) => this.handleChildrenChange(data)} 
                                    fluid multiple selection 
                                    options={this.prepareChildrenOptions()} 
                                />
                                <div id={`alert-addArea-withoutchildren`} className="ui red message" style={{display: this.state.childrenError ? "block" : "none"}}>
                                    Dodaj przynajmniej jedno dziecko
                                </div>
                            </div>
                            
                        </form>
                    </Modal.Content>
            );
        }
    }

    renderActions = () => {
        if(this.state.choosingArea) {
            return (
                <Modal.Actions>
                    <button className="ui button yellow left" onClick={() => this.handleBackButton()}>Wróć</button>
                </Modal.Actions>
            );
        }
        else {
            return(
                <Modal.Actions>
                    <button className="ui button yellow" onClick={() => this.handleNextButton()}>Dalej</button>
                </Modal.Actions>
            );
        }
    }

    render() {
        return (
            <Modal
                size="tiny"
                open={this.state.open}
                onClose={() => this.close()}
                trigger={
                    <button id="area-addArea" className="circular ui icon button blue" data-tooltip="Dodaj obszar" onClick={() => this.open()}>
                        <i className="icon plus large"></i>
                    </button>
                }
            >
                <Modal.Header>Dodaj obszar</Modal.Header>
                {this.renderModal()}
                {this.renderActions()}
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