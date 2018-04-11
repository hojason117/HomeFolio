import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { withRouter } from 'react-router-dom';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const styles = theme => ({
    /*buy: {
        margin: 20,
        width: '30%',
        position: 'fixed',
        top: '30%',
        left: '15%'
    },
    sell: {
        margin: 20,
        width: '30%',
        position: 'fixed',
        top: '30%',
        right: '15%'
    }*/
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

const MapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: 29.642, lng: -82.347 }}
    >
        {props.isMarkerShown && <Marker position={{ lat: 29.642, lng: -82.347 }} />}
    </GoogleMap>
))

class Home extends React.Component {
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

                <MapComponent
                    isMarkerShown={false}
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `500px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            </div>
        )
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
