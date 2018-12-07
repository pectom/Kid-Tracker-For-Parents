import React from 'react';
import Header from '../Header';
import Sidebar from './Sidebar';
import Map from '../Map';

class Rules extends React.Component {
    areaOptions = [
        {
            text: 'Dom',
            value: 1
        },
        {
            text: 'Basen',
            value: 2
        },
    ];

    listOfRules = [
        {
            active: true,
            startdate: "2018-12-23",
            enddate: "2019-02-13",
            starttime: "15:45",
            endtime: "18:00",
            area: this.areaOptions[1],
            icon: 'building',
            kids: [['Jessica', 'red'], ['Brajan', 'blue']]
        },
        {
            active: true,
            startdate: "2017-07-01",
            enddate: "2019-08-14",
            starttime: "08:45",
            endtime: "12:00",
            area: this.areaOptions[0],
            icon: 'home',
            kids: [['Sebastian', 'green'], ['Brajan', 'blue']]
        }
    ];

    render() {
        return(
            <div>
                <Header />
                <div className="ui grid">
                    <div className="ui five wide column">
                        <Sidebar />
                    </div>
                    <div className="ui eleven wide column">
                        <Map mapSrc="https://www.openstreetmap.org/export/embed.html?bbox=19.77857360839844%2C50.01939873027272%2C20.059912109375003%2C50.07425960242971" />
                    </div>
                </div>
            </div>
        );
    }
}

export default Rules;