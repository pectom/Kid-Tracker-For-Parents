import React from 'react';
import Header from '../Header';
import Sidebar from './Sidebar';
import Map from '../../Map';

class Areas extends React.Component {
    listOfAreas = [
        {
            icon: "home",
            name: "Szkoła",
            kidsInitials: [['J','red','Jessica'], ['B','purple','Brajan']]
        },
        {
            icon: "building",
            name: "Basen",
            kidsInitials: [['J','red', 'Jessica'], ['S','orange', 'Sebastian']]
        }
    ];

    render() {
        return (
            <div>
                <Header />
                <div className="ui grid">
                    <div className="ui five wide column">
                        <Sidebar areas={this.listOfAreas} />
                    </div>
                    <div className="ui eleven wide column">
                        <Map mapSrc="https://www.google.com/maps/embed/v1/place?key=AIzaSyAHbKWGMwqv0GJhaVj1XKMXFZeLdzzXK&q=Czarnowiejska,Kraków" />
                    </div>
                </div>
            </div>
        );
    }
}

export default Areas;