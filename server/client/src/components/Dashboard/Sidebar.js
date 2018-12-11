import React from 'react';
import Today from './Today';
import Rule from './Rule';
import { connect } from 'react-redux';

import * as actions from '../../actions';

class Sidebar extends React.Component {
    async componentDidMount() {
        await this.props.fetchChildren();
        await this.props.fetchAreas();
        await this.props.fetchCurrentRules();
    }

    renderRules = () => {
        return this.props.rules ? this.props.rules.map( rule => {
            const area = this.props.areas ? this.props.areas.filter(area => area._id === rule.areaId) : [];
            const child = this.props.children ? this.props.children.filter(child => child._id === rule.childId) : [];
            return (<Rule 
                key={rule._id}
                id={rule._id} 
                area={area[0]} 
                active={rule.active} 
                startdate={rule.startDate ? rule.startDate.substr(0,10) : ''}
                enddate={rule.endDate ? rule.endDate.substr(0,10) : ''}
                starttime={rule.startDate ? rule.startDate.substr(11,5) : ''}
                endtime={rule.endDate ? rule.endDate.substr(11,5) : ''} 
                child={child[0]}
                repetition={rule.repetition}
            />);
        }) : [];
    };

    render() {
        return (
            <div>
                <div className="ui segment">
                    <Today />
                    {this.renderRules()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ rules, areas, children }) => {
    return { rules, areas, children };
}

export default connect(mapStateToProps, actions)(Sidebar);