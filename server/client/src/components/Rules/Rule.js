import React from 'react';
import EditRule from './EditRule';
import DeleteRule from './DeleteRule';

class Rule extends React.Component {
    state = {
        active: false
    };

    handleToggle = () => {
        this.setState ({
            active: !this.state.active
        });
    }

    repetitionOptions = [
        {
            text: 'codziennie',
            value: 'DAILY'
        },
        {
            text: 'cotygodniowo',
            value: 'WEEKLY'
        },
        {
            text: 'comiesięcznie',
            value: 'MONTHLY'
        },
        {
            text: 'co rok',
            value: 'YEARLY'
        },
        {
            text: 'dni robocze',
            value: 'WORKDAYS'
        },
        {
            text: 'weekendy',
            value: 'WEEKENDS'
        },
    ];

    render() {
        return(
            <div className="ui segment">
                <div className="ui segment" style={{textAlign: "center", fontSize: "20px"}}>
                    <div className="ui stackable grid">
                        <div className="ui five wide column">
                            <div className="ui toggle checkbox">
                                <input id={`rules-toggle-rule-${this.props.id}-child-${this.props.child._id}`} name="active" checked={this.state.active} type="checkbox" onChange={e => {this.handleToggle(e)}} />
                                <label></label>
                            </div> 
                        </div>
                        <div className="ui eleven wide column">
                            {this.props.area ? this.props.area.name : ''} <i className={`${this.props.area ? this.props.area.iconId : ''} icon`} />
                        </div>
                    </div>
                </div>
                <div className="ui stackable grid">
                    <div className="ui six wide column">
                        <div className="ui segment">
                            {this.props.starttime} do {this.props.endtime}
                        </div>
                    </div>
                    <div className="ui ten wide column">
                        <div className="ui segment">
                            {this.props.startdate} do {this.props.enddate}
                        </div>
                    </div>
                </div>
                <div className="ui stackable grid">
                    <div className="ui ten wide column">
                        <div className="ui segment">
                            {this.repetitionOptions.filter(option => option.value === this.props.repetition)[0] ? this.repetitionOptions.filter(option => option.value === this.props.repetition)[0].text : ''}
                        </div>
                    </div>
                    <div className="ui six wide column">
                        <div style={{textAlign: "right"}}>
                            <EditRule 
                                area={this.props.area ? this.props.area._id : ''}  
                                active={this.props.active} 
                                startdate={this.props.startdate}
                                enddate={this.props.enddate}
                                starttime={this.props.starttime}
                                endtime={this.props.endtime} 
                                child={this.props.child}
                                repetition={this.props.repetition}
                                id={this.props.id}
                            />
                            <DeleteRule 
                                area={this.props.area}  
                                active={this.props.active} 
                                startdate={this.props.startdate}
                                enddate={this.props.enddate}
                                starttime={this.props.starttime}
                                endtime={this.props.endtime} 
                                child={this.props.child}
                                repetition={this.props.repetition}
                                id={this.props.id}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Rule;