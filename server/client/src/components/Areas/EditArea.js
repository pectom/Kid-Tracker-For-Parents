import React from 'react';
import { Modal, Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

class EditArea extends React.Component {
    state = {
        open: false,
        editingArea: false,
        name: this.props.name,
        icon: this.props.icon,
        area: this.props.area,
        childrenIds: []
    }

    async componentDidMount() {
        await this.props.fetchChildren();
        this.setState({
            childrenIds: this.props.myChildren.map(child => { return child._id })
        });
    }

    close = () => {
        this.setState({
            open: false
        })
    }

    open = () => {
        this.setState({
            open: true
        });
    }

    handleAreaEdited = async (area) => {
        this.setState({
            area
        });
        await this.props.updateArea({
            name: this.state.name,
            iconId: this.state.icon,
            children: this.state.childrenIds,
            area: this.state.area,
            id: this.props.id
        });
        this.props.fetchAreas();
        this.close();
    }

    handleSaveClick = async () => {
        console.log(this.state.area)
        await this.props.updateArea({
            name: this.state.name,
            iconId: this.state.icon,
            children: this.state.childrenIds,
            area: this.state.area,
            id: this.props.id
        });
        this.props.fetchAreas();
        this.close();
    }

    handleNextClick = () => {
        this.setState({
            editingArea: true
        })
    }

    handleBackClick = () => {
        this.setState({
            editingArea: false
        })
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

    handleKidChange = data => {
        this.setState({
            childrenIds: data.value
        });
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

    prepareChildrenOptions = () => {
        const children = this.props.children ? this.props.children : [];
        return children.map( child => {
            return {
                text: child.name,
                value: child._id,
                icon: {
                    name:'',
                    circular: true,
                    color: child.iconColor,
                    inverted: true,
                    size: 'tiny'
                }
            }
        })
    }

    renderContent = () => {
        if(this.state.editingArea) {

        }
        else {
            return (
                <Modal.Content>
                    <form className="ui form">
                        <div className="field">
                            <label>Nazwa i ikona</label>
                            <div className="two fields">
                                <div className="field">
                                    <input
                                        id={`area-editArea-name-${this.props.id}`}
                                        name="name" 
                                        type="text" 
                                        value={this.state.name} 
                                        onChange={e => this.handleNameChange(e)} 
                                    />
                                </div>
                                <div className="field">
                                    <Dropdown
                                        id={`area-editArea-icon-${this.props.id}`}
                                        value={this.state.icon} 
                                        fluid selection 
                                        options={this.iconOptions} 
                                        onChange={(e,data) => this.handleIconChange(data)} 
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <label>Dzieci</label>
                            <Dropdown
                                id={`area-editArea-children-${this.props.id}`}
                                value={this.state.childrenIds} 
                                fluid multiple selection 
                                options={this.prepareChildrenOptions()} 
                                onChange={(e, data) => { this.handleKidChange(data)} }
                            />
                        </div>
                        
                    </form>
                </Modal.Content>
            );
        }
    }

    renderActions = () => {
        if(this.state.editingArea) {
            return(
                <Modal.Actions>
                    <button className="ui button yellow" onClick={() => this.handleBackClick()}>Wróć</button>
                    <button className="ui button green" onClick={() => this.handleSaveClick()}>Zapisz</button>
                </Modal.Actions>
            );
        }
        else {
            return(
                <Modal.Actions>
                    <button className="ui button yellow" onClick={() => this.handleNextClick()}>Dalej</button>
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
                    <button id={`area-editArea-${this.props.id}`} className="ui icon button" data-tooltip="Edytuj obszar" onClick={() => this.open()}>
                                <i className="edit icon" />
                    </button>
                }
            >
                <Modal.Header>Edytuj obszar</Modal.Header>
                {this.renderContent()}
                {this.renderActions()}
            </Modal>
        );
    }
}

const mapStateToProps = ({ children, areas }) => {
    return {
        children,
        areas
    }
}

export default connect(mapStateToProps, actions)(EditArea);