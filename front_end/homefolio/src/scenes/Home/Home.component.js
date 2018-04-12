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
        this.state = {
            markers: []
        }
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

    MapComponent = withScriptjs(withGoogleMap((props) =>
        <GoogleMap
            //ref={props.onMapMounted}
            defaultZoom={10}
            defaultCenter={{ lat: 34.07382, lng: -118.2618 }}
            onBoundsChanged={() => {
                //this.setState({markers: this.service.fetchRegionHouses()});
                //console.log(this.ref.getBounds());
            }}
        >
            {props.isMarkerShown && this.state.markers}
        </GoogleMap>
    ))

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

                <this.MapComponent
                    isMarkerShown={true}
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: '100%' }} />}
                    containerElement={<div style={{ height: '500px' }} />}
                    mapElement={<div style={{ height: '100%' }} />}
                />
            </div>
        )
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
