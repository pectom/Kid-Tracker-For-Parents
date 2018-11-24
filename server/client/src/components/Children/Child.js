import React from 'react';
import EditChild from './EditChild';
import DeleteChild from './DeleteChild';

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
                            <EditChild name={this.props.name} iconColor={this.props.iconColor}/>
                            <DeleteChild name={this.props.name} iconColor={this.props.iconColor} renderKidIcon={() => this.renderKidIcon()}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Child;