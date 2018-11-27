import React from 'react';

class Rule extends React.Component {
    renderKidsIcons(kidsInitials) {
        const icons = kidsInitials.map((kidInital) => {
            return <i key={kidInital[1]} className={`circular icon inverted ${kidInital[1]}`}>{kidInital[0]}</i>
        });
        return icons;
    }

    render() {
        return (
            <div className="ui segment">
                <div className="ui segment" style={{textAlign: 'center', fontSize: '20px'}}>
                    {this.props.name} <i className={`${this.props.icon} icon`}/>
                </div>
                <div className="ui grid">
                    <div className="ui eight wide column">
                        <div className="ui segment" style={{textAlign: 'center'}}>
                            {this.props.time}
                        </div>
                    </div>
                    <div className="ui eight wide column">
                        <div style={{textAlign: 'right'}}>
                            {this.renderKidsIcons(this.props.kidsInitials)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Rule;