import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import MapMarker from '../../scenes/Home/MapMarker.component';
import { compose, withProps } from "recompose";

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.service = new HouseService();
        this.map = null;
        this.state = {
            mapLoaded: false,
            center: {
                lat: 34.07382, lng: -118.2618
            }
        }
    }

    MapComponent = compose(
        withProps({
            googleMapURL: "https://maps.googleapis.com/maps/api/js?&key=AIzaSyAHbTvrtAr7iIMx0ZHhwwB3RqgWpRy4fvs&v=3.exp&libraries=geometry,drawing,places",
            loadingElement: <div style={{ height: '100%' }} />,
            containerElement: <div style={{ height: '100%', width: '100%' }} />,
            mapElement: <div style={{ height: '100%' }} />,
        }),
        withScriptjs,
        withGoogleMap
    )((props) =>
        <GoogleMap
            ref={this.onMapMounted}
            defaultZoom={16}
            defaultCenter={{ lat: 34.07382, lng: -118.2618 }}
            center={this.state.center}
            onDragEnd={this.onDragEnd}
            onZoomChanged={this.onZoomChanged}
            onIdle={this.onLoaded}
        >
            {props.houses.map((house, index) => 
                <MapMarker key={index} listId={index} info={house} focus={props.focus} onFocusChanged={(target) => this.onFocusChanged(target)} onAddToCompare={this.props.onAddToCompare} />)}
        </GoogleMap>
    )

    render() {
        return (
            <this.MapComponent houses={this.props.houses} focus={this.props.focus} />
        )
    }
}

export default Map;
