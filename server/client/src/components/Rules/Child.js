import React from 'react';

class Child extends React.Component {
    renderKidIcon(name, color) {
        return <i className={`circular icon inverted ${color}`}>{name ? name[0] : ''}</i>
    }

    render() {
        return (
            <div className="ui segment">
                <div className="ui stackable grid">
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
        )
    }
}

export default Child;