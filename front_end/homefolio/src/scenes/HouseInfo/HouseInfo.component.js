import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import NavBar from '../../components/NavBar/NavBar.component';
import DataService from '../../services/data.service';
import classnames from 'classnames';
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, StreetViewPanorama } from "react-google-maps";
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import red from 'material-ui/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import VisibilityIcon from '@material-ui/icons/Visibility';
//import AccountIcon from '@material-ui/icons/AccountCircle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from 'material-ui/Button';
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
//import EditIcon from '@material-ui/ModeEdit';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from 'material-ui/Tooltip';
//import Link from 'react-router/lib/Link';

/* <Button variant="fab" disabled aria-label="mode_edit" className={classes.button}>
                    <EditIcon/>
                </Button>*/

const styles = theme => ({
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

    fab: {
        margin: theme.spacing.unit * 2,
    },
    absolute: {
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 3,
    },

});

// h_id,u_id,bathroomCnt,bedroomCnt,buildingQualityID,livingAreaSize,latitude,longitude,lotSize,cityID,county,zip,yearBuilt,storyNum,price,tax

class HouseInfo extends React.Component {
    constructor(props) {
        super(props);
        this.service = new DataService();
        this.state = {
            info: {
                h_id: '',
                u_id: '',
                bathroomCnt: 0, 
                bedroomCnt: 0,
                buildingQualityID: 0,
                livingAreaSize: 0,
                latitude: 0.0,
                longitude: 0.0,
                lotSize: 0,
                cityID: 0,
                county: '',
                zip: 0,
                yearBuilt: 0,
                storyNum: 0,
                price: 0,
                tax: 0
            },
            addr: ''
        }
    }

    StreetViewPanorama = compose(
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

   componentWillMount = async () => {
       await this.service.fetchHouseInfo(this.props.match.params['h_id']).then((result) => {this.setState({ info: result })});
       await this.service.getHouseAddress(this.state.info.latitude, this.state.info.longitude).then((result) => {this.setState({ addr: result })});
   }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <NavBar />
                <Tooltip id="tooltip-fab" title="Homepage">
                <Button  variant="fab" mini color="secondary" aria-label="home" 
                 className={classes.button} >
                    <HomeIcon/>
                </Button>
                </Tooltip>
                <Tooltip id="tooltip-fab" title="Add to Compare">
                <Button variant="fab" mini color="primary" aria-label="add" className={classes.button}>
                    <AddIcon />
                </Button>
                </Tooltip>
                <Tooltip id="tooltip-fab" title="Delete House">
                    <Button variant="fab" mini aria-label="delete" className={classes.button}>
                        <DeleteIcon />
                    </Button>
                </Tooltip>

                <Card className={classes.card}>
                    <CardHeader
                        avatar={
                        <Avatar aria-label="Recipe" className={classes.avatar}>
                            J
                        </Avatar>
                        }
                        action={
                            <CardActions>
                            <Button size="small">CONTACT SELLER</Button>
                            </CardActions>
                        }
                        title="House Owner: Jason Ho"
                        subheader="Some other infos about owners"
                    />
                    <this.StreetViewPanorama />
                    <CardContent>
                        <Typography variant="headline">
                            {this.state.addr}
                        </Typography>
                        <Typography variant="display1">
                            4 beds    3 baths     2,542 sqft
                        </Typography>
                        <Typography variant="display2">
                            ${this.state.info.price}
                        </Typography>
                        
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
