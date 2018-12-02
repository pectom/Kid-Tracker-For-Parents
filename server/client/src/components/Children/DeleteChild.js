import React from 'react';
import { Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

class DeleteChild extends React.Component {
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

    handleClick = () => {
        this.props.deleteChild({
            id: this.props.id
        });
        this.close();
    }

    renderKidIcon(name, color) {
        return <i className={`circular icon inverted ${color}`}>{name ? name[0] : ''}</i>
    }

    render() {
        
        return (
            <Modal
                size='mini'
                open={this.state.open}
                onClose={() => this.close()}
                trigger={
                    <button className="ui icon button" data-tooltip="Usuń dziecko" onClick={() => this.open()}>
                        <i className="trash alternate icon" />
                    </button>
                }
            >
                <Modal.Header>Jesteś pewien?</Modal.Header>
                <Modal.Content>
                    <div className="ui segment">
                        <div className="ui grid">
                            <div className="ui twelve wide column">
                                <div className="ui segment" style={{textAlign: 'center', fontSize: '20px'}}>
                                    {this.props.name}
                                </div>
                            </div>
                            <div className="ui four wide column middle aligned content">
                                <div>
                                    {this.renderKidIcon(this.props.name, this.props.iconColor)}
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

const mapStateToProps = ({ children }) => {
    return { children };
}

export default connect(mapStateToProps,actions)(DeleteChild);