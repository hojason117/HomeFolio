import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import MapMarker from '../../scenes/Search/MapMarker.component';
import HouseService from '../../services/house.service';
import { compose, withProps } from "recompose";

const mapStateToProps = state => {
    return { houses: state.searchHousesResults };
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

    onDragEnd = () => {
        this.setState({ center: this.map.getCenter() });
    }

    onMapMounted = ref => {
        this.map = ref;
    }

    onLoaded = () => {
        if(!this.state.mapLoaded)
            this.setState({ mapLoaded: true, center: this.map.getCenter() });
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
            defaultZoom={10}
            defaultCenter={{ lat: 34.07382, lng: -118.2618 }}
            center={this.state.center}
            onDragEnd={this.onDragEnd}
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

export default connect(mapStateToProps)(Map);
