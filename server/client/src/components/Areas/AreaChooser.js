import React from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import { DrawingManager } from 'react-google-maps/lib/components/drawing/DrawingManager';

class AreaChooser extends React.Component {

    handlePolygonComplete = (event) => {
        event.latLngs.j[0].j.forEach(latLng => console.log(latLng.lat() + "  " + latLng.lng()))
        this.props.handleAreaComplete(event.latLngs.j[0].j);
    }

   render() {
            const GoogleMapExample = withGoogleMap(() => {
                return <GoogleMap
                    defaultCenter = { { lat: 50.067124,  lng: 19.914019 } }
                    defaultZoom = { 15 }
                >
                    <DrawingManager
                        defaultDrawingMode="polygon"
                        defaultOptions={{
                            drawingControl: false
                        }}
                        onPolygonComplete = {(event,data) => this.handlePolygonComplete(event,data) }
                    />
                </GoogleMap>
            });
        return(
            <div className="ui segment">
                <GoogleMapExample
                    containerElement={ <div style={{ height: `70vh` }} /> }
                    mapElement={ <div style={{ height: `100%` }} /> }
                />
            </div>
        );
   }
};
export default AreaChooser;