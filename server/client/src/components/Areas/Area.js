import React from 'react';
import EditArea from './EditArea';
import DeleteChild from './DeleteArea';

class Area extends React.Component {
    renderKidsIcons = () => this.props.kidsInitials.map( kidInital => 
        <i key={kidInital[1]} className={`circular icon inverted ${kidInital[1]}`}>{kidInital[0]}</i>
    );

    render() {
        return (
            <div className="ui segment">
                <div className="ui segment" style={{textAlign: "center", fontSize: "20px"}}>
                    {this.props.name} <i className={`${this.props.icon} icon`} />
                </div>
                <div className="ui grid">
                    <div className="ui ten wide column">
                        {this.renderKidsIcons()}
                    </div>
                    <div className="ui six wide column">
                        <EditArea 
                            name={this.props.name} 
                            icon={this.props.icon} 
                            kidsNames={this.props.kidsInitials.map(el => el[2])} 
                            lat={this.props.lat} 
                            lon={this.props.lon} 
                            rad={this.props.rad} 
                        />
                        <DeleteChild 
                            name={this.props.name} 
                            icon={this.props.icon} 
                            kidsInitials={this.props.kidsInitials} 
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Area;