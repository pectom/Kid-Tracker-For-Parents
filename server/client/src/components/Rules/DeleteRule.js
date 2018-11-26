import React from 'react';
import { Modal } from 'semantic-ui-react';

class DeleteRule extends React.Component {
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
        console.log("Delete rule");
        this.close();
    }

    renderKidsIcons = () => this.props.kids.map( kidInital => 
        <i key={kidInital[1]} className={`circular icon inverted ${kidInital[1]}`}>{kidInital[0][0]}</i>
    );

    render() {
        return (
            <Modal
                size="mini"
                open={this.state.open}
                onClose={() => this.close()}
                trigger={
                    <button className="ui icon button" data-tooltip="Usuń regułę" onClick={() => this.open()}>
                        <i className="trash alternate icon" />
                    </button>
                }
            >
                <Modal.Header>Jesteś pewien?</Modal.Header>
                <Modal.Content>
                <div className="ui segment">
                    <div className="ui segment" style={{textAlign: "center", fontSize: "20px"}}>
                        {this.props.area.text} <i className={`${this.props.icon} icon`} />
                    </div>
                    <div className="ui grid">
                        <div className="ui eight wide column">
                            <div className="ui segment">
                                {this.props.starttime}-{this.props.endtime}
                            </div>
                        </div>
                        <div className="ui eight wide column">
                            {this.renderKidsIcons()}
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

export default DeleteRule;