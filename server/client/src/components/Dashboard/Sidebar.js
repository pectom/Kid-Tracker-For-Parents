import React from 'react';
import Today from './Today';
import Rule from './Rule';

class Sidebar extends React.Component {
    render() {
        return (
            <div>
                <div className="ui segment">
                    <Today />
                    <Rule name="Szkoła" time="11:00-14:15" kidsInitials={[['J','red'], ['B','purple']]} icon="graduation cap" />
                    <Rule name="Basen" time="8:00-9:15" kidsInitials={[['B','purple']]} icon="building outside" />
                </div>
            </div>
        );
    }
}

export default Sidebar;