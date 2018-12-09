import React from 'react';
import { Modal, Dropdown } from 'semantic-ui-react';
import Child from './Child';
import { connect } from 'react-redux';

import * as actions from '../../actions';

class AddRule extends React.Component {
    state = {
        open: false,
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        areaId: '',
        repetition: 'DAILY',
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
        await this.props.createRule({
            startDate: this.state.startDate, 
            endDate: this.state.endDate, 
            startTime: this.state.startTime, 
            endTime: this.state.endTime, 
            repetition: this.state.repetition, 
            areaId: this.state.areaId, 
            children: [this.props.child._id]
        });
        this.close();
    }

    handleStartDateChange = (e) => {
        this.setState({
            startDate: e.target.value
        })
    }

    handleEndDateChange = (e) => {
        this.setState({
            endDate: e.target.value
        })
    }

    handleStartTimeChange = (e) => {
        this.setState({
            startTime: e.target.value
        })
    }

    handleEndTimeChange = (e) => {
        this.setState({
            endTime: e.target.value
        })
    }

    handleAreaChange = (data) => {
        this.setState({
            areaId: data.value
        })
    }

    handleRepetitionChange = (data) => {
        this.setState({
            repetition: data.value
        })
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

    prepareAreaOptions = () => {
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
                    <button className="circular ui icon button blue" data-tooltip="Dodaj regułę" onClick={() => this.open()}>
                        <i className="icon plus large"></i>
                    </button>
                }
            >
                <Modal.Header>Dodaj regułę dla: <Child key={this.props.child._id} name={this.props.child.name} iconColor={this.props.child.iconColor} id={this.props.child._id} /></Modal.Header>
                <Modal.Content>
                    <form className="ui form">
                        <div className="two fields">
                            <div className="field">
                                <label>Data rozpoczęcia</label>
                                <input name="startdate" type="date" value={this.state.startDate} onChange={(e) => this.handleStartDateChange(e)} />
                            </div>
                            <div className="field">
                                <label>Data zakończenia</label>
                                <input name="enddate" type="date" value={this.state.endDate} onChange={(e) => this.handleEndDateChange(e)} />
                            </div>
                        </div>
                        <div className="two fields">
                            <div className="field">
                                <label>Czas rozpoczęcia</label>
                                <input name="starttime" type="time" value={this.state.startTime} onChange={(e) => this.handleStartTimeChange(e)} />
                            </div>
                            <div className="field">
                                <label>Czas zakończenia</label>
                                <input name="endtime" type="time" value={this.state.endTime} onChange={(e) => this.handleEndTimeChange(e)} />
                            </div>
                        </div>
                        <div className="field">
                            <label>Obszar</label>
                            <Dropdown placeholder='Wybierz obszar' fluid selection options={this.prepareAreaOptions()} onChange={(e,data) => this.handleAreaChange(data)} />
                        </div>
                        <div className="field">
                            <label>Powtarzanie</label>
                            <Dropdown placeholder='codziennie' fluid selection options={this.repetitionOptions} onChange={(e,data) => this.handleRepetitionChange(data)} />
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

const mapStateToProps = ({ rules, areas }) => {
    return { rules, areas };
}

export default connect(mapStateToProps, actions)(AddRule);