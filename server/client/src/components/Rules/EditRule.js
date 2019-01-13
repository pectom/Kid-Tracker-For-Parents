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
        area: this.props.area,
        repetition: this.props.repetition,
        dateError: false,
        timeError: false
    }

    async componentDidMount() {
        await this.props.fetchAreas();
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

    handleClick = async () => {
        await this.checkDate();
        await this.checkTime();
        if(!this.state.dateError && !this.state.timeError){
            await this.props.updateRule({
                id: this.props.id,
                startDate: this.state.startdate,
                endDate: this.state.enddate,
                startTime: this.state.starttime,
                endTime: this.state.endtime,
                areaId: this.state.area,
                childId: this.props.child,
                repetition: this.state.repetition
            });
            await this.props.fetchRules(this.props.child._id);
            this.close();
        }
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

    handleRepetitionChange = data => {
        this.setState({
            repetition: data.value
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

    repetitionOptions = [
        {
            text: 'codziennie',
            value: 'DAILY'
        },
        {
            text: 'cotygodniowo',
            value: 'WEEKLY'
        },
        {
            text: 'comiesięcznie',
            value: 'MONTHLY'
        },
        {
            text: 'co rok',
            value: 'YEARLY'
        },
        {
            text: 'dni robocze',
            value: 'WORKDAYS'
        },
        {
            text: 'weekendy',
            value: 'WEEKENDS'
        },
    ];

    checkDate = () => {
        const start = Date.parse(this.state.startdate.replace(/-/g, ' '));
        const end = Date.parse(this.state.enddate.replace(/-/g, ' '));
        if(start > end) {
            this.setState({
                dateError: true
            });
        } else {
            this.setState({
                dateError: false
            });
        }
    }

    checkTime = () => {
        const start = Date.parse('01 01 2019 ' + this.state.starttime + ':10');
        const end = Date.parse('01 01 2019 ' + this.state.endtime + ':10');
        if(start > end) {
            this.setState({
                timeError: true
            });
        } else {
            this.setState({
                timeError: false
            });
        }
    }

    render() {
        return (
            <Modal
                size="tiny"
                open={this.state.open}
                onClose={() => this.close()}
                trigger={
                    <button id={`rules-edit-rule-${this.props.id}-child-${this.props.child._id}`} className="ui icon button" data-tooltip="Edytuj regułę" onClick={() => this.open()}>
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
                                    id={`rules-edit-rule-${this.props.id}-child-${this.props.child._id}-startdate`} 
                                    name="startdate" 
                                    type="date" 
                                    value={this.state.startdate} 
                                    onChange={e => this.handleStartdateChange(e)}
                                />
                            </div>
                            <div className="field">
                                <label>Data zakończenia</label>
                                <input
                                    id={`rules-edit-rule-${this.props.id}-child-${this.props.child._id}-enddate`} 
                                    name="enddate" 
                                    type="date" 
                                    value={this.state.enddate} 
                                    onChange={e => this.handleEnddateChange(e)}
                                />
                            </div>
                        </div>
                        <div id={`alert-addrule-date`} className="ui red message" style={{display: this.state.dateError ? "block" : "none"}}>
                            Data rozpoczęcia reguły musi być wcześniej niż data zakończenia reguły
                        </div>
                        <div className="two fields">
                            <div className="field">
                                <label>Czas rozpoczęcia</label>
                                <input 
                                    id={`rules-edit-rule-${this.props.id}-child-${this.props.child._id}-starttime`} 
                                    name="starttime" 
                                    type="time" 
                                    value={this.state.starttime} 
                                    onChange={(e) => this.handleStarttimeChange(e)}
                                />
                            </div>
                            <div className="field">
                                <label>Czas zakończenia</label>
                                <input
                                    id={`rules-edit-rule-${this.props.id}-child-${this.props.child._id}-endtime`} 
                                    name="endtime" 
                                    type="time" 
                                    value={this.state.endtime} 
                                    onChange={(e) => this.handleEndtimeChange(e)}
                                />
                            </div>
                        </div>
                        <div id={`alert-addrule-date`} className="ui red message" style={{display: this.state.timeError ? "block" : "none"}}>
                            Czas rozpoczęcia reguły musi być wcześniej niż czas zakończenia reguły
                        </div>
                        <div className="field">
                            <label>Obszar</label>
                            <Dropdown 
                                id={`rules-edit-rule-${this.props.id}-child-${this.props.child._id}-area`} 
                                placeholder='Obszar' 
                                fluid selection 
                                options={this.prepareAreasOptions()} 
                                value={this.state.area} 
                                onChange={(e, data) => this.handleAreaChange(data)}
                            />
                        </div>
                        <div className="field">
                            <label>Powtarzanie</label>
                            <Dropdown 
                                id={`rules-edit-rule-${this.props.id}-child-${this.props.child._id}-repetition`} 
                                fluid selection 
                                options={this.repetitionOptions} 
                                value={this.state.repetition}
                                onChange={(e,data) => this.handleRepetitionChange(data)}
                            />
                        </div>
                        
                    </form>
                </Modal.Content>
                <Modal.Actions>
                    <button id={`rules-edit-rule-${this.props.id}-child-${this.props.child._id}-saveButton`} className="ui button green" onClick={() => this.handleClick()}>Zapisz</button>
                </Modal.Actions>
            </Modal>
        );
    }
}

const mapStateToProps = ({ rules, areas }) => {
    return { rules, areas };
}

export default connect(mapStateToProps, actions)(EditRule);