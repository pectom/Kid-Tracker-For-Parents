import React from 'react';
import AddRule from './AddRule';
import Child from './Child';
import RulesForChild from './RulesForChild';
import { connect } from 'react-redux';

import * as actions from '../../actions';

class Sidebar extends React.Component {
    state = {
        choosenChild : false
    }

    async componentDidMount() {
        await this.props.fetchChildren();
    }

    handleClick = (child) => {
        this.setState({
            choosenChild: child
        })
    }

    renderChildren() {
        const children = this.props.children ? this.props.children : [];
        return children.map(child => {
            return <div key={child._id} style={{marginBottom: 10}} onClick={() => this.handleClick(child)}><Child key={child._id} name={child.name} iconColor={child.iconColor} id={child._id} /></div>;
        });
    }

    render() {
        if(!this.state.choosenChild) {
            return (
                <div>
                    <div className="ui segment" >
                        <div className="ui segment" style={{textAlign: "center"}}>
                            <b>Wybierz dziecko:</b> 
                        </div>
                        {this.renderChildren()}
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <div className="ui segment" >
                        <div className="ui segment" style={{textAlign: "center"}}>
                            <i className="address card icon big" /> <b>Reguły dla:</b>
                            <Child key={this.state.choosenChild._id} name={this.state.choosenChild.name} iconColor={this.state.choosenChild.iconColor} id={this.state.choosenChild._id} />
                        </div>
                        <div>
                            <RulesForChild child={this.state.choosenChild} />
                        </div>
                        <div className="ui grid" style={{marginTop:0}}>
                            <div className="ui twelve wide column">
                                <button className="circular ui icon button yellow" data-tooltip="Wróć do wyboru dziecka" onClick={() => this.setState({choosenChild: false})}>
                                    <i className="icon angle left large"></i>
                                </button>
                            </div>
                            <div className="ui four wide column" style={{textAlign: "right"}}>
                                <AddRule child={this.state.choosenChild} />
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = ({ children }) => {
    return { children };
}

export default connect(mapStateToProps, actions)(Sidebar);