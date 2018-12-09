import React from 'react';
import Rule from './Rule';
import { connect } from 'react-redux';

import * as actions from '../../actions';

class RulesForChild extends React.Component {
    async componentDidMount() {
        await this.props.fetchAreas();
        await this.props.fetchRules(this.props.child._id);
    }

    renderRules = () => {
        return this.props.rules ? this.props.rules.map( rule => {
            const area = this.props.areas ? this.props.areas.filter(area => area._id === rule.areaId) : [];
            return (<Rule 
                key={rule._id}
                id={rule._id} 
                area={area[0]} 
                active={rule.active} 
                startdate={rule.startDate ? rule.startDate.substr(0,10) : ''}
                enddate={rule.endDate ? rule.endDate.substr(0,10) : ''}
                starttime={rule.startDate ? rule.startDate.substr(11,5) : ''}
                endtime={rule.endDate ? rule.endDate.substr(11,5) : ''} 
                child={rule.children}
                repetition={rule.repetition}
            />);
        }) : [];
    };

    render() {
        return (
            <div>
                {this.renderRules()}
            </div>
        );
    }
}

const mapStateToProps = ({ rules, areas }) => {
    return { rules, areas };
}

export default connect(mapStateToProps, actions)(RulesForChild);
