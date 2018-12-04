import React from 'react';
import Child from './Child';
import AddChild from './AddChild';
import { connect } from 'react-redux';

import * as actions from '../../actions';

class Sidebar extends React.Component {
    componentDidMount() {
        this.props.fetchChildren();
    }

    renderChildren() {
        const children = this.props.children ? this.props.children : [];
        return children.map(child => {
            return <Child key={child._id} name={child.name} iconColor={child.iconColor} id={child._id} />;
        });
    }

    render() {
        return (
            <div>
                <div className="ui segment">
                    <div className="ui segment" style={{textAlign: "center"}}>
                        <i className="child icon big" /><b>Dzieci</b> 
                    </div>
                    {this.renderChildren()}
                    <div style={{textAlign: 'right'}}>
                        <AddChild/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ children, auth }) => {
    return { children, auth };
}

export default connect(mapStateToProps, actions)(Sidebar);