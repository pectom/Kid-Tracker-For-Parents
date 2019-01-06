import React from 'react';
import { Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

class DeleteRule extends React.Component {
    state = {
        open: false
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
        await this.props.deleteRule(this.props.id);
        await this.props.fetchRules(this.props.child._id);
        this.close();
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


    render() {
        return (
            <Modal
                size="mini"
                open={this.state.open}
                onClose={() => this.close()}
                trigger={
                    <button id={`rules-delete-rule-${this.props.id}-child-${this.props.child._id}`} className="ui icon button" data-tooltip="Usuń regułę" onClick={() => this.open()}>
                        <i className="trash alternate icon" />
                    </button>
                }
            >
                <Modal.Header>Jesteś pewien?</Modal.Header>
                <Modal.Content>
                <div className="ui segment">
                    <div className="ui segment" style={{textAlign: "center", fontSize: "20px"}}>
                        {this.props.area ? this.props.area.name : ''} <i className={`${this.props.area ? this.props.area.iconId : ''} icon`} />
                    </div>
                    <div className="ui stackable grid">
                        <div className="ui six wide column">
                            <div className="ui segment">
                                {this.props.starttime} do {this.props.endtime}
                            </div>
                        </div>
                        <div className="ui ten wide column">
                            <div className="ui segment">
                                {this.props.startdate} do {this.props.enddate}
                            </div>
                        </div>
                    </div>
                    <div className="ui stackable grid">
                        <div className="ui ten wide column">
                            <div className="ui segment">
                                {this.repetitionOptions.filter(option => option.value === this.props.repetition)[0] ? this.repetitionOptions.filter(option => option.value === this.props.repetition)[0].text : ''}
                            </div>
                        </div>
                    </div>
                </div>
                </Modal.Content>
                <Modal.Actions>
                    <button id={`rules-delete-rule-${this.props.id}-child-${this.props.child._id}-deleteButton`} className="ui button green" onClick={() => this.handleClick()}>Usuń</button>
                </Modal.Actions>
            </Modal>
        );
    }
}

const mapStateToProps = ({ rules, areas }) => {
    return { rules, areas };
}

export default connect(mapStateToProps, actions)(DeleteRule);