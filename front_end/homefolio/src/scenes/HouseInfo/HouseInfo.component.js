import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';

import { withRouter } from 'react-router-dom';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, StreetViewPanorama } from "react-google-maps";
import DataService from '../../services/data.service';
import { compose, withProps, lifecycle } from "recompose";


import classnames from 'classnames';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import red from 'material-ui/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import VisibilityIcon from '@material-ui/icons/Visibility';
import FaceIcon from '@material-ui/icons/Face';
import AccountIcon from '@material-ui/icons/AccountCircle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
//import 'typeface-roboto';


const styles = theme => ({
    /*container: {
        textAlign: 'center'
    },*/
    button: {
        margin: theme.spacing.unit,
    },
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    card: {
        width: '50%',
        margin: '0 auto',
        //maxWidth: 800,
      },
      media: {
        height: 294,
      },
      actions: {
        display: 'flex',
      },
      expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
        marginLeft: 'auto',
      },
      expandOpen: {
        transform: 'rotate(180deg)',
      },
      avatar: {
        backgroundColor: red[500],
    },

});

// h_id,u_id,bathroomCnt,bedroomCnt,buildingQualityID,livingAreaSize,latitude,longitude,lotSize,cityID,county,zip,yearBuilt,storyNum,price,tax

class HouseInfo extends React.Component {
    constructor(props) {
        super(props);
        this.service = new DataService();
    }

    /*SignoutButton = withRouter(
        ({ history }) =>
            <Button
                variant='raised'
                secondary='true'
                className={this.props.button}
                color='secondary'
                onClick={() => history.push("/")} >
                Sign out
             </Button>
    )*/

    StreetViewPanorma = compose(
        withProps({
            googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places",
            loadingElement: <div style={{ height: `100%` }} />,
            containerElement: <div style={{ height: `400px` }} />,
            mapElement: <div style={{ height: `100%` }} />,
            center: { lat: 49.2853171, lng: -123.1119202 },
          }),
          withScriptjs,
          withGoogleMap
        )(props =>
            <GoogleMap defaultZoom={8} defaultCenter={props.center}>
              <StreetViewPanorama defaultPosition={props.center} visible>
              </StreetViewPanorama>
            </GoogleMap>
    )

    state = { expanded: false };

    handleExpandClick = () => {
        this.setState({ expanded: !this.state.expanded });
    };

    render() {
        const { classes } = this.props;

        return (
            <div>
                <AppBar position='static'>
                    <Toolbar>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            House Information
                        </Typography>
                    </Toolbar>
                </AppBar>
            
                <Card className={classes.card}>
                    <CardHeader
                        avatar={
                        <Avatar aria-label="Recipe" className={classes.avatar}>
                            J
                        </Avatar>
                        }
                        action={
                        <IconButton>
                            <AccountIcon />
                        </IconButton>
                        }
                        title="House Owner: Jason Ho"
                        subheader="Some other infos about owners"
                    />
                    <CardMedia component={this.StreetViewPanorma} />
                    <CardContent>
                        <Typography variant="headline">2930 Klamath Ave, Simi Valley, CA 93063</Typography>
                        <Typography variant="display1">4 beds    3 baths     2,542 sqft</Typography>
                        <Typography variant="display2">$899,000</Typography>
                        
                    </CardContent>
                    <CardActions className={classes.actions} disableActionSpacing>
                        <IconButton aria-label="Add to favorites">
                        <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="Viewed">
                        <VisibilityIcon />
                        </IconButton>
                        <IconButton
                        className={classnames(classes.expand, {
                            [classes.expandOpen]: this.state.expanded,
                        })}
                        onClick={this.handleExpandClick}
                        aria-expanded={this.state.expanded}
                        aria-label="Show more"
                        >
                        <ExpandMoreIcon />
                        </IconButton>
                    </CardActions>
                    <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                        <Typography paragraph variant="subheading">
                            Detailed Information:
                        </Typography>
                        <Typography paragraph>Year Built:</Typography>
                        <Typography paragraph>Building Quality:</Typography>
                        <Typography paragraph>Number of Stories:</Typography>
                        <Typography paragraph>Lot Size:</Typography>
                        <Typography paragraph>Total Price:</Typography>
                        <Typography paragraph>Tax:</Typography>
                        </CardContent>
                    </Collapse>
                </Card>

            </div>
        )
    }
}

HouseInfo.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HouseInfo);
