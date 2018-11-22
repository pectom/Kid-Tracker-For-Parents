import React from 'react';
import Child from './Child';
import AddChild from './AddChild';

class Sidebar extends React.Component {
    handleAdd = () => {
        
    }

    render() {
        return (
            <div>
                <div className="ui segment">
                    <div className="ui segment" style={{textAlign: "center"}}>
                        <i className="child icon big" /><b>Dzieci</b> 
                    </div>
                    <Child name="Jessica" kidInitial={["J","red"]} />
                    <Child name="Brajan" kidInitial={["B","purple"]} />
                    <Child name="Sebastian" kidInitial={["J","green"]} />
                    <div style={{textAlign: 'right'}}>
                        <AddChild/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Sidebar;