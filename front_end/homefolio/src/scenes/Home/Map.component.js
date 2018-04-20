import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { homeMapBoundChanged, homeDisplayHousesChanged, homeMapFocusedMarkerChanged } from '../../redux/actions/main';
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import MapMarker from '../../scenes/Home/MapMarker.component';
import HouseService from '../../services/house.service';
import { compose, withProps } from "recompose";

const mapStateToProps = state => {
    return { houses: state.homeDisplayHouses };
};

const mapDispatchToProps = dispatch => {
    return {
        homeMapBoundChanged: newBound => dispatch(homeMapBoundChanged(newBound)),
        homeDisplayHousesChanged: newHouses => dispatch(homeDisplayHousesChanged(newHouses)),
        homeMapFocusedMarkerChanged: newFocused => dispatch(homeMapFocusedMarkerChanged(newFocused))
    };
};

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

    resizeBounds = (origBounds) => {
        const lngDiff = origBounds.b.f - origBounds.b.b;
        const latDiff = origBounds.f.f - origBounds.f.b;

        return { b: { b: origBounds.b.b + lngDiff*0.1, f: origBounds.b.f - lngDiff*0.1 }, f: { b: origBounds.f.b + latDiff*0.05, f: origBounds.f.f - latDiff*0.15 } };
    }

    onDragEnd = () => {
        this.props.homeMapBoundChanged(this.map.getBounds());
        this.props.homeMapFocusedMarkerChanged(-1);
        const queryBounds = this.resizeBounds(this.map.getBounds());
        this.service.fetchRegionHouses(queryBounds, 30).then(result => this.props.homeDisplayHousesChanged(result));
        this.setState({ center: this.map.getCenter() });
    }

    onZoomChanged = () => {
        this.props.homeMapBoundChanged(this.map.getBounds());
        this.props.homeMapFocusedMarkerChanged(-1);
        const queryBounds = this.resizeBounds(this.map.getBounds());
        this.service.fetchRegionHouses(queryBounds, 30).then(result => this.props.homeDisplayHousesChanged(result));
        this.setState({ center: this.map.getCenter() });
    }

    onMapMounted = ref => {
        this.map = ref;
    }

    onLoaded = () => {
        if(!this.state.mapLoaded) {
            this.setState({ mapLoaded: true });
            this.props.homeMapBoundChanged(this.map.getBounds());
            const queryBounds = this.resizeBounds(this.map.getBounds());
            this.service.fetchRegionHouses(queryBounds, 30).then(result => this.props.homeDisplayHousesChanged(result));
            this.setState({ center: this.map.getCenter() });
        }
    }

    MapComponent = compose(
        withProps({
            googleMapURL: "https://maps.googleapis.com/maps/api/js?&key=AIzaSyAHbTvrtAr7iIMx0ZHhwwB3RqgWpRy4fvs",
            loadingElement: <div style={{ height: '100%' }} />,
            containerElement: <div style={{ height: '100%', width: '100%' }} />,
            mapElement: <div style={{ height: '100%' }} />,
        }),
        withScriptjs,
        withGoogleMap
    )((props) =>
        <GoogleMap
            ref={this.onMapMounted}
            defaultZoom={12}
            defaultCenter={{ lat: 34.07382, lng: -118.2618 }}
            center={this.state.center}
            onDragEnd={this.onDragEnd}
            onZoomChanged={this.onZoomChanged}
            onIdle={this.onLoaded}
        >
            {props.houses.map((house, index) => <MapMarker key={index} listId={index} info={house} />)}
        </GoogleMap>
    )

    render() {
        return <this.MapComponent houses={this.props.houses} />
    }
}

Map.propTypes = {
    houses: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
