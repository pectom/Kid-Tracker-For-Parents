import React from 'react';
import EditArea from './EditArea';
import DeleteArea from './DeleteArea';
import { connect } from 'react-redux';

import * as actions from '../../actions';

class Area extends React.Component {
    state = {
        myChildren: []
    }

    componentDidMount() {
        const children = this.props.children ? this.props.children : [];
        this.setState({
            myChildren: children.map(childTab => { return childTab[0] })
        });
    }

    renderChildrenIcons() {
        return this.state.myChildren.map(child => {
            return <i key={child._id} className={`circular icon inverted ${child.iconColor}`}>{child.name ? child.name[0] : ''}</i>
        });
    }

    render() {
        return (
            <div className="ui segment">
                <div className="ui segment" style={{textAlign: "center", fontSize: "20px"}}>
                    {this.props.name} <i className={`${this.props.icon} icon`} />
                </div>
                <div className="ui grid">
                    <div className="ui ten wide column">
                        {this.renderChildrenIcons()}
                    </div>
                    <div className="ui six wide column">
                        <EditArea 
                            id={this.props.id}
                            name={this.props.name} 
                            icon={this.props.icon} 
                            myChildren={this.state.myChildren} 
                            lat={this.props.lat} 
                            lon={this.props.lon} 
                            rad={this.props.rad} 
                        />
                        <DeleteArea 
                            name={this.props.name} 
                            icon={this.props.icon} 
                            myChildren={this.state.myChildren}
                            id={this.props.id}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ children }) => {
    return {
        allChildren: children
    }
}

export default connect(mapStateToProps, actions)(Area);