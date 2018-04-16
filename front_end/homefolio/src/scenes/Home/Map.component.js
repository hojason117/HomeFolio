import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import MapMarker from '../../scenes/Home/MapMarker.component';
import DataService from '../../services/data.service';
import { compose, withProps, lifecycle } from "recompose";

class Map extends React.Component {
    MapComponent = compose(
        withProps({
            googleMapURL: "https://maps.googleapis.com/maps/api/js?&key=AIzaSyAHbTvrtAr7iIMx0ZHhwwB3RqgWpRy4fvs&v=3.exp&libraries=geometry,drawing,places",
            loadingElement: <div style={{ height: '100%' }} />,
            containerElement: <div style={{ height: '100%', width: '60%' }} />,
            mapElement: <div style={{ height: '100%' }} />,
        }),
        lifecycle({
            componentWillMount() {
                const refs = {}

                this.setState({
                    bounds: null,
                    center: {
                        lat: 34.07382, lng: -118.2618
                    },
                    houses: [],

                    onMapMounted: ref => {
                        refs.map = ref;
                    },
                    onDragEnd: () => {
                        var service = new DataService();
                        service.fetchRegionHouses(refs.map.getBounds(), this);

                        this.setState({
                            bounds: refs.map.getBounds(),
                            center: refs.map.getCenter()
                        });
                    },
                    onZoomChanged: () => {
                        var service = new DataService();
                        service.fetchRegionHouses(refs.map.getBounds(), this);
                        
                        this.setState({
                            bounds: refs.map.getBounds(),
                            center: refs.map.getCenter()
                        });
                    }
                })
            },
        }),
        withScriptjs,
        withGoogleMap
    )((props) =>
        <GoogleMap
            ref={props.onMapMounted}
            defaultZoom={16}
            defaultCenter={{ lat: 34.07382, lng: -118.2618 }}
            center={props.center}
            onDragEnd={props.onDragEnd}
            onZoomChanged={props.onZoomChanged}
        >
            {props.houses.map((house, index) => <MapMarker key={index} info={house} />)}
        </GoogleMap>
    )

    render() {
        return (
            <this.MapComponent />
        )
    }
}

export default Map;
