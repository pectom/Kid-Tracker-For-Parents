import React from 'react';
import EditArea from './EditArea';
import DeleteArea from './DeleteArea';
import { connect } from 'react-redux';

import * as actions from '../../actions';

class Area extends React.Component {

    renderChildrenIcons() {
        return this.props.children ? this.props.children.map(child => {
            return (
                <i 
                    key={child._id} 
                    className={`circular icon inverted`}
                    ref={(node) => { if (node) { node.style.setProperty("background-color", child.iconColor, "important"); }}}
                >
                    {child.name ? child.name[0] : ''}
                </i>
            );
        }) : [];
    }

    render() {
        return (
            <div className="ui segment" key={this.props._id}>
                <div className="ui segment" style={{textAlign: "center", fontSize: "20px"}}>
                    {this.props.name} <i className={`${this.props.icon} icon`} />
                </div>
                <div className="ui stackable grid">
                    <div className="ui ten wide column">
                        {this.renderChildrenIcons()}
                    </div>
                    <div className="ui six wide column">
                        <EditArea 
                            id={this.props.id}
                            name={this.props.name} 
                            icon={this.props.icon} 
                            myChildren={this.props.children ? this.props.children : []} 
                            area={this.props.area}
                        />
                        <DeleteArea 
                            name={this.props.name} 
                            icon={this.props.icon} 
                            myChildren={this.props.children ? this.props.children : []}
                            id={this.props.id}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ children, areas }) => {
    return {
        allChildren: children,
        areas
    }
}

export default connect(mapStateToProps, actions)(Area);