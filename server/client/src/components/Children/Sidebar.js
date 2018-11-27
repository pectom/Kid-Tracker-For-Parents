import React from 'react';
import Child from './Child';
import AddChild from './AddChild';

class Sidebar extends React.Component {
    render() {
        return (
            <div>
                <div className="ui segment">
                    <div className="ui segment" style={{textAlign: "center"}}>
                        <i className="child icon big" /><b>Dzieci</b> 
                    </div>
                    <Child name="Jessica" iconColor="red" />
                    <Child name="Brajan" iconColor="purple" />
                    <Child name="Sebastian" iconColor="green" />
                    <div style={{textAlign: 'right'}}>
                        <AddChild/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Sidebar;