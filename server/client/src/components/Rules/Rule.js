import React from 'react';
import EditRule from './EditRule';

class Rule extends React.Component {
    state = {
        active: this.props.active
    };

    renderKidsIcons = () => this.props.kids.map( kidInital => 
        <i key={kidInital[1]} className={`circular icon inverted ${kidInital[1]}`}>{kidInital[0][0]}</i>
    );

    handleToggle = () => {
        this.setState ({
            active: this.state.active ? false : true
        });
    }

    render() {
        return(
            <div className="ui segment">
                <div className="ui segment" style={{textAlign: "center", fontSize: "20px"}}>
                    <div className="ui grid">
                        <div className="ui five wide column">
                            <div className="ui toggle checkbox">
                                <input name="active" checked={this.state.active} type="checkbox" onChange={e => {this.handleToggle(e)}} />
                                <label></label>
                            </div> 
                        </div>
                        <div className="ui eleven wide column">
                            {this.props.area.text} <i className={`${this.props.icon} icon`} />
                        </div>
                    </div>
                </div>
                <div className="ui grid">
                    <div className="ui six wide column">
                        <div className="ui segment">
                            {this.props.starttime}-{this.props.endtime}
                        </div>
                    </div>
                    <div className="ui ten wide column">
                        {this.renderKidsIcons()}
                        <EditRule 
                            area={this.props.area} 
                            icon={this.props.icon} 
                            active={this.props.active} 
                            startdate={this.props.startdate}
                            enddate={this.props.enddate}
                            starttime={this.props.starttime}
                            endtime={this.props.endtime} 
                            kids={this.props.kids}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Rule;