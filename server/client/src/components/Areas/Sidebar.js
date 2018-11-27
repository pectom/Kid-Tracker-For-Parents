import React from 'react';
import Area from './Area';
import AddArea from './AddArea';

class Sidebar extends React.Component {
    renderAreas = () => this.props.areas.map(area => 
        <Area icon={area.icon} name={area.name} kidsInitials={area.kidsInitials} />
    );
     

    render() {
        return (
            <div>
                <div className="ui segment" >
                    <div className="ui segment" style={{textAlign: "center"}}>
                        <i className="street view icon big" /><b>Obszary</b> 
                    </div>
                    {this.renderAreas()}
                    <div style={{textAlign: "right"}}>
                        <AddArea />
                    </div>
                </div>
            </div>
            
        );
    }
}

export default Sidebar;