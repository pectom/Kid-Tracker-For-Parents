import React from 'react';
import { Modal } from 'semantic-ui-react';

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

    handleClick = () => {
        console.log("Delete area");
        this.close();
    }

    renderKidsIcons = () => this.props.kidsInitials.map( kidInital => 
        <i key={kidInital[1]} className={`circular icon inverted ${kidInital[1]}`}>{kidInital[0]}</i>
    );

    render() {
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
                                    {this.renderKidsIcons()}
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

export default DeleteArea;