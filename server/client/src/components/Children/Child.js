import React from 'react';

class Child extends React.Component {
    renderKidIcon(name, color) {
        return <i className={`circular icon inverted ${color}`}>{name[0]}</i>
    }

    render() {
        return (
            <div className="ui segment">
                <div className="ui grid">
                    <div className="ui eight wide column">
                        <div className="ui segment" style={{textAlign: 'center', fontSize: '20px'}}>
                            {this.props.name}
                        </div>
                    </div>
                    <div className="ui eight wide column middle aligned content">
                        <div>
                            {this.renderKidIcon(this.props.name, this.props.iconColor)}

                            <button className="ui icon button" data-tooltip="Edytuj dane dziecka">
                                <i className="edit icon" />
                            </button>
                            <button className="ui icon button" data-tooltip="Usuń dziecko">
                                <i className="trash alternate icon" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Child;