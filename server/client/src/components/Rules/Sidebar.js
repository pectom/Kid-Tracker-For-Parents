import React from 'react';
import Rule from './Rule';
import AddRule from './AddRule';

class Sidebar extends React.Component {
    renderRules = () => this.props.rules.map( rule => 
        <Rule 
            key={rule.areaName} 
            area={rule.area} 
            icon={rule.icon} 
            active={rule.active} 
            startdate={rule.startdate}
            enddate={rule.enddate}
            starttime={rule.starttime}
            endtime={rule.endtime} 
            kids={rule.kids}
        />
    );

    render() {
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

export default Sidebar;