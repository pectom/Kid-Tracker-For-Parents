import React from 'react';
import Area from './Area';
import AddArea from './AddArea';
import { connect } from 'react-redux';

import * as actions from '../../actions';

class Sidebar extends React.Component {
    async componentDidMount() {
        await this.props.fetchAreas();
    }

    renderAreas = () => {
        const areas = this.props.areas ? this.props.areas : [];
        return areas.map(area => <Area key={area._id} icon={area.iconId} name={area.name} children={area.children} lat={area.latitude} lon={area.longitude} rad={area.radius} id={area._id} />);
    }
     
    render() {
        console.log(this.props.areas)
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

const mapStateToProps = ({ areas }) => {
    return {
        areas
    };
};

export default connect(mapStateToProps, actions)(Sidebar);