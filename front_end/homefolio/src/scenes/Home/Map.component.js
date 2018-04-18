import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import MapMarker from '../../scenes/Home/MapMarker.component';
import DataService from '../../services/data.service';
import { compose, withProps } from "recompose";

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.service = new DataService();
        this.map = null;
        this.state = {
            mapLoaded: false,
            center: {
                lat: 34.07382, lng: -118.2618
            },
            houses: [],
            focus: -1
        }
    }

    resizeBounds = (origBounds) => {
        const lngDiff = origBounds.b.f - origBounds.b.b;
        const latDiff = origBounds.f.f - origBounds.f.b;

        return { b: { b: origBounds.b.b + lngDiff*0.1, f: origBounds.b.f - lngDiff*0.1 }, f: { b: origBounds.f.b + latDiff*0.1, f: origBounds.f.f - latDiff*0.1 } };
    }

    onDragEnd = () => {
        this.props.onBoundChanged(this.map.getBounds());
        const queryBounds = this.resizeBounds(this.map.getBounds());
        this.service.fetchRegionHouses(queryBounds, 30).then((result) => { this.setState({ houses: result }) });
        this.setState({
            center: this.map.getCenter(),
            focus: -1
        });
    }

    onZoomChanged = () => {
        this.props.onBoundChanged(this.map.getBounds());
        const queryBounds = this.resizeBounds(this.map.getBounds());
        this.service.fetchRegionHouses(queryBounds, 30).then((result) => { this.setState({ houses: result }) });
        this.setState({
            center: this.map.getCenter(),
            focus: -1
        });
    }

    onMapMounted = ref => {
        this.map = ref;
    }

    onLoaded = () => {
        if(!this.state.mapLoaded) {
            this.setState({ mapLoaded: true });
            this.props.onBoundChanged(this.map.getBounds());
            const queryBounds = this.resizeBounds(this.map.getBounds());
            this.service.fetchRegionHouses(queryBounds, 30).then((result) => { this.setState({ houses: result }) });
        }
    }

    onFocusChanged = (target) => {
        this.setState({ focus: target })
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
                <MapMarker key={index} listId={index} info={house} focus={props.focus} onFocusChanged={(target) => this.onFocusChanged(target)} />)}
        </GoogleMap>
    )

    render() {
        return (
            <this.MapComponent houses={this.state.houses} focus={this.state.focus} />
        )
    }
}

export default Map;
