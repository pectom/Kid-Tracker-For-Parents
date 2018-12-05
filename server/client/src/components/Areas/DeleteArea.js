import React from 'react';
import { Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

class DeleteArea extends React.Component {
    state = {
        open: false
    }

    close = () => {
        this.setState({
            open: false
        })
    }

    open = () => {
        this.setState({
            open: true
        })
    }

    handleClick = async () => {
        await this.props.deleteArea({
            id: this.props.id
        });
        this.props.fetchAreas();
        this.close();
    }

    renderKidIcons() {
        const children = this.props.myChildren ? this.props.myChildren : [];
        return children.map(child => {
            return <i key={child._id} className={`circular icon inverted ${child.iconColor}`}>{child.name ? child.name[0] : ''}</i>;
        });
    }

    render() {
        console.log(this.props.myChildren)
        return (
            <Modal
                size="mini"
                open={this.state.open}
                onClose={() => this.close()}
                trigger={
                    <button className="ui icon button" data-tooltip="Usuń obszar" onClick={() => this.open()}>
                        <i className="trash alternate icon" />
                    </button>
                }
            >
                <Modal.Header>Jesteś pewien?</Modal.Header>
                <Modal.Content>
                    <div className="ui segment">
                        <div className="ui grid">
                            <div className="ui ten wide column">
                                <div className="ui segment" style={{textAlign: 'center', fontSize: '20px'}}>
                                    {this.props.name}  <i className={`${this.props.icon} icon`} />
                                </div>
                            </div>
                            <div className="ui six wide column middle aligned content">
                                <div>
                                    {this.renderKidIcons()}
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Content>
                <Modal.Actions>
                    <button className="ui button green" onClick={() => this.handleClick()}>Usuń</button>
                </Modal.Actions>
            </Modal>
        );
    }
}
const mapStateToProps = ({ areas }) => {
    return { areas };
}

export default connect(mapStateToProps,actions)(DeleteArea);