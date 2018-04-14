import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { withRouter } from 'react-router-dom';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import DataService from '../../services/data.service';
import { compose, withProps, lifecycle } from "recompose";

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    }
});

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.service = new DataService();
    }

    SignoutButton = withRouter(
        ({ history }) =>
            <Button
                variant='raised'
                secondary='true'
                className={this.props.button}
                color='secondary'
                onClick={() => history.push("/")} >
                Sign out
             </Button>
    )

    MapComponent = compose(
        withProps({
            googleMapURL: "https://maps.googleapis.com/maps/api/js?&key=AIzaSyAHbTvrtAr7iIMx0ZHhwwB3RqgWpRy4fvs&v=3.exp&libraries=geometry,drawing,places",
            loadingElement: <div style={{ height: `100%` }} />,
            containerElement: <div style={{ height: `500px` }} />,
            mapElement: <div style={{ height: `100%` }} />,
        }),
        lifecycle({
            componentWillMount() {
                const refs = {}

                this.setState({
                    bounds: null,
                    center: {
                        lat: 34.07382, lng: -118.2618
                    },
                    markers: [],
                    onMapMounted: ref => {
                        refs.map = ref;

                        setTimeout(() => {
                            var service = new DataService();
                            service.fetchRegionHouses(refs.map.getBounds(), this);

                            this.setState({
                                bounds: refs.map.getBounds(),
                                center: refs.map.getCenter()
                            });
                        }, 1000);
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
            {props.markers.map((marker, index) => <Marker key={index} position={marker} />)}
        </GoogleMap>
    ) 

    render() {
        const { classes } = this.props;

        return (
            <div>
                <AppBar position='static'>
                    <Toolbar>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            Home
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Button
                    variant='raised'
                    primary='true'
                    className={classes.button}
                    color='primary' >
                    BUY
                </Button>
                <Button
                    variant='raised'
                    primary='true'
                    className={classes.button}
                    color='primary' >
                    SELL
                </Button>
                <this.SignoutButton />

                <this.MapComponent />
            </div>
        )
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
