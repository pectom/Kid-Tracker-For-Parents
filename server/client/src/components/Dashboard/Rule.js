import React from 'react';

class Rule extends React.Component {
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
                    {this.props.area ? this.props.area.name : ''} <i className={`${this.props.area ? this.props.area.iconId : ''} icon`} />
                </div>
                <div className="ui grid">
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
                <div className="ui grid">
                    <div className="ui ten wide column">
                        <div className="ui segment">
                            {this.repetitionOptions.filter(option => option.value === this.props.repetition)[0] ? this.repetitionOptions.filter(option => option.value === this.props.repetition)[0].text : ''}
                        </div>
                    </div>
                    <div className="ui six wide column">
                        <div style={{textAlign: "right"}}>
                            <i className={`circular icon inverted ${this.props.child ? this.props.child.iconColor : ''}`}>{this.props.child ? this.props.child.name[0] : ''}</i>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Rule;