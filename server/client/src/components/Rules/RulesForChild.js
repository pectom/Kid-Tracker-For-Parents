import React from 'react';
import Rule from './Rule';
import AddRule from './AddRule';
import { connect } from 'react-redux';

import * as actions from '../../actions';

class RulesForChild extends React.Component {
    async componentDidMount() {
        await this.props.fetchRules(this.props.child._id);
    }

    renderRules = () => {
        return this.props.rules ? this.props.rules.map( rule => 
            <Rule 
                key={rule._id}
                id={rule._id} 
                area={rule.areaId} 
                active={rule.active} 
                startdate={rule.startDate.substr(0,10)}
                enddate={rule.endDate.substr(0,10)}
                starttime={rule.startDate.substr(11,5)}
                endtime={rule.endDate.substr(11,5)} 
                children={rule.children}
            />
        ) : [];
    };

    render() {
        console.log(this.props.child)
        return (
            <div>
                {this.renderRules()}
            </div>
        );
    }
}

const mapStateToProps = ({ rules }) => {
    return { rules };
}

export default connect(mapStateToProps, actions)(RulesForChild);
