import React from 'react';
import { Modal, Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

class EditRule extends React.Component {
    state = {
        open: false,
        startdate: this.props.startdate,
        enddate: this.props.enddate,
        starttime: this.props.starttime,
        endtime: this.props.endtime,
        area: this.props.area.value,
        kids: this.props.kids.map(kid => kid[0])
    }

    async componentDidMount() {
        await this.props.fetchChildren();
        await this.props.fetchAreas();
        await this.props.fetchRules();
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
        console.log("Edit rule");
        this.close();
    }

    handleStartdateChange = (e) => {
        this.setState({
            startdate: e.target.value
        });
    }

    handleEnddateChange = (e) => {
        this.setState({
            enddate: e.target.value
        });
    }

    handleStarttimeChange = (e) => {
        this.setState({
            starttime: e.target.value
        });
    }

    handleEndtimeChange = (e) => {
        this.setState({
            endtime: e.target.value
        });
    }

    handleAreaChange = data => {
        this.setState({
            area: data.value
        });
    }

    handleKidChange = data => {
        this.setState({
            kids: data.value
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
        }
    ];

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

    prepareAreasOptions = () => {
        const areas = this.props.areas ? this.props.areas : [];
        return areas.map( area => {
            return {
                text: area.name,
                value: area._id,
                icon: {
                    name:area.iconId
                }
            }
        })
    }

    render() {
        return (
            <Modal
                size="tiny"
                open={this.state.open}
                onClose={() => this.close()}
                trigger={
                    <button className="ui icon button" data-tooltip="Edytuj regułę" onClick={() => this.open()}>
                                <i className="edit icon" />
                    </button>
                }
            >
                <Modal.Header>Edytuj regułę</Modal.Header>
                <Modal.Content>
                    <form className="ui form">
                        <div className="two fields">
                            <div className="field">
                                <label>Data rozpoczęcia</label>
                                <input 
                                    name="startdate" 
                                    type="date" 
                                    value={this.state.startdate} 
                                    onChange={e => this.handleStartdateChange(e)}
                                />
                            </div>
                            <div className="field">
                                <label>Data zakończenia</label>
                                <input 
                                    name="enddate" 
                                    type="date" 
                                    value={this.state.enddate} 
                                    onChange={e => this.handleEnddateChange(e)}
                                />
                            </div>
                        </div>
                        <div className="two fields">
                            <div className="field">
                                <label>Czas rozpoczęcia</label>
                                <input 
                                    name="starttime" 
                                    type="time" 
                                    value={this.state.starttime} 
                                    onChange={(e) => this.handleStarttimeChange(e)}
                                />
                            </div>
                            <div className="field">
                                <label>Czas zakończenia</label>
                                <input 
                                    name="endtime" 
                                    type="time" 
                                    value={this.state.endtime} 
                                    onChange={(e) => this.handleEndtimeChange(e)}
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label>Obszar</label>
                            <Dropdown 
                                placeholder='Obszar' 
                                fluid selection 
                                options={this.prepareAreasOptions()} 
                                value={this.state.area} 
                                onChange={(e, data) => this.handleAreaChange(data)}
                            />
                        </div>
                        <div className="field">
                            <label>Dzieci</label>
                            <Dropdown 
                                placeholder='Dzieci' 
                                fluid multiple selection 
                                options={this.prepareChildrenOptions()} 
                                value={this.state.kids}
                                onChange={(e,data) => this.handleKidChange(data)}
                            />
                        </div>
                        
                    </form>
                </Modal.Content>
                <Modal.Actions>
                    <button className="ui button green" onClick={() => this.handleClick()}>Zapisz</button>
                </Modal.Actions>
            </Modal>
        );
    }
}

const mapStateToProps = ({ rules, children, areas }) => {
    return { rules, children, areas };
}

export default connect(mapStateToProps, actions)(EditRule);