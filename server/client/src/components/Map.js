import React from 'react';

class Map extends React.Component {
    render() {
        return (
            <div className="ui segment">
                <div className="ui embed">
                    <iframe
                        title="Mapa"
                        src={this.props.mapSrc} 
                    />
                </div>
            </div>
        );
    }
}

export default Map;