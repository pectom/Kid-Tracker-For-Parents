import React from 'react';
import EditArea from './EditArea';
import DeleteArea from './DeleteArea';
import { connect } from 'react-redux';

import * as actions from '../../actions';

class Area extends React.Component {
    state = {
        myChildren: []
    }

    async componentDidMount() {
        await this.props.fetchChildren();
        this.renderChildrenIcons();
    }

    renderChildrenIcons() {
        const allChildren = this.props.allChildren ? this.props.allChildren : [];
        return allChildren.filter( child => {
            var boo = false;
            const children = this.props.children ? this.props.children : [];
            children.forEach(childId => {
                if(child._id === childId){
                    boo = true;
                }
            });
            return boo;
        }).forEach( child => {
            this.setState({
                myChildren: [...this.state.myChildren, {
                    name: child.name,
                    id: child._id,
                    iconColor: child.iconColor
                }]
            });
        });
    }

    renderKidIcons() {
        const icons = this.state.myChildren ? this.state.myChildren : [];
        return icons.map(childIcon => {
            return <i key={childIcon.id} className={`circular icon inverted ${childIcon.iconColor}`}>{childIcon.name ? childIcon.name[0] : ''}</i>;
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
                        {this.renderKidIcons()}
                    </div>
                    <div className="ui six wide column">
                        <EditArea 
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