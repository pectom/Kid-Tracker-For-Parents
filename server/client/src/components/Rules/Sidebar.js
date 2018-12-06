import React from 'react';
import Rule from './Rule';
import AddRule from './AddRule';
import { connect } from 'react-redux';

import * as actions from '../../actions';

class Sidebar extends React.Component {
    async componentDidMount() {
        await this.props.fetchRules();
    }

    renderRules = () => this.props.rules ? this.props.rules.map( rule => 
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

    render() {
        console.log(this.props.rules);
        return (
            <div>
                <div className="ui segment" >
                    <div className="ui segment" style={{textAlign: "center"}}>
                        <i className="address card icon big" /> <b>Reguły</b> 
                    </div>
                    {this.renderRules()}
                    <div style={{textAlign: "right"}}>
                        <AddRule />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ rules }) => {
    return { rules };
}

export default connect(mapStateToProps, actions)(Sidebar);