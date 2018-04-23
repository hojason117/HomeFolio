import React from 'react';
import { connect } from "react-redux";
import { houseUpdateDialogToggled } from '../../redux/actions/main';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Update from './Update.component';
import NavBar from '../../components/NavBar/NavBar.component';
import HouseService from '../../services/house.service';
import UserService from '../../services/user.service';
import classnames from 'classnames';
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, StreetViewPanorama } from "react-google-maps";
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import red from 'material-ui/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from 'material-ui/Button';
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from 'material-ui/Tooltip';
import Grid from 'material-ui/Grid';
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog';

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

const mapStateToProps = state => {
    return { houseUpdateDialogOpen: state.houseUpdateDialogOpen };
}

const mapDispatchToProps = dispatch => {
    return { houseUpdateDialogToggled: newBound => dispatch(houseUpdateDialogToggled()) };
};

class HouseInfo extends React.Component {
    constructor(props) {
        super(props);
        this.houseService = new HouseService();
        this.userService = new UserService();
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
            userinfo: {
                u_id: '',
                email: '',
                username: '',
                password: '',
                age: 0,
                area: '',
                bio: '',
                seller: '',
                buyer: ''
            },
            addr: '',
            deleteDialogOpen: false,
            liked: false,
            likesCount: 0,
            viewedCount: 0
        }
    }

    StreetViewPanorama = compose(
        withProps({
            googleMapURL: "https://maps.googleapis.com/maps/api/js?&key=AIzaSyAHbTvrtAr7iIMx0ZHhwwB3RqgWpRy4fvs",
            loadingElement: <div style={{ height: `100%` }} />,
            containerElement: <div style={{ height: `400px` }} />,
            mapElement: <div style={{ height: `100%` }} />,
        }),
            withScriptjs,
            withGoogleMap
        )(props =>
            <GoogleMap defaultZoom={16} center={props.center}>
                <Marker position={props.center} />
                <StreetViewPanorama position={props.center} visible />
            </GoogleMap>
    )

    handleExpandClick = () => {
        this.setState({ expanded: !this.state.expanded });
    };

    handleDelete = () => {
        this.houseService.deleteHouse(this.state.info.h_id).then(this.props.history.replace('/home'));
    }

    handleLikeUnlike = (like) => {
        if(like)
            this.houseService.addLike(localStorage.getItem("u_id"), this.state.info.h_id).then(this.setState({ liked: true, likesCount: this.state.likesCount + 1 }));
        else
            this.houseService.removeLike(localStorage.getItem("u_id"), this.state.info.h_id).then(this.setState({ liked: false, likesCount: this.state.likesCount - 1 }));
    }

    componentWillReceiveProps = async (nextProps) => {
        if (nextProps.houseUpdateDialogOpen !== this.props.houseUpdateDialogOpen) {
            await setTimeout(() => this.houseService.fetchHouseInfo(this.props.match.params['h_id']).then((result) => { this.setState({ info: result }) }), 1500);
            this.houseService.getHouseAddress(this.state.info.latitude, this.state.info.longitude).then((result) => { this.setState({ addr: result }) });
        }
    }

    componentDidMount = async () => {
        await this.houseService.fetchHouseInfo(this.props.match.params['h_id']).then((result) => {this.setState({ info: result })});
        this.houseService.getHouseAddress(this.state.info.latitude, this.state.info.longitude).then((result) => {this.setState({ addr: result })});
        this.userService.fetchUserInfo(this.state.info.u_id).then((result) => {this.setState({ userinfo: result })});

        var likedHouses = [];
        await this.userService.fetchLikedHouse(localStorage.getItem("u_id")).then(houses => likedHouses = houses);
        var liked = false;
        for(var index in likedHouses) {
            if(likedHouses[index].h_id === this.state.info.h_id)
                liked = true;
        }
        this.setState({ liked: liked });

        this.houseService.fetchLikedUser(this.state.info.h_id).then(users => this.setState({ likesCount: users.length }));
        this.houseService.fetchViewededUser(this.state.info.h_id).then(users => this.setState({ viewedCount: users.length }));

        var timestamp = new Date();
        var time = (timestamp.getFullYear() + '-' + (timestamp.getMonth()+1) + '-' + timestamp.getDate());
        this.houseService.addViewed(localStorage.getItem("u_id"), this.state.info.h_id, time);
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <NavBar />
                <Update h_id={this.state.info.h_id} />
                {this.state.info.u_id === localStorage.getItem('u_id') &&
                    <div>
                        <Tooltip id="tooltip-fab" title="Edit House">
                            <Button variant="fab" mini aria-label="edit" className={classes.button} onClick={() => this.props.houseUpdateDialogToggled()} >
                                <EditIcon/>
                            </Button>
                        </Tooltip>
                        <Tooltip id="tooltip-fab" title="Delete House">
                            <Button variant="fab" mini aria-label="delete" className={classes.button} onClick={() => this.setState({deleteDialogOpen: true })}>
                                <DeleteIcon />
                            </Button>
                        </Tooltip>
                        <Dialog
                            open={this.state.deleteDialogOpen}
                            onClose={() => this.setState({ deleteDialogOpen: false })}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">{"Please confirm"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Are you sure you want to delete this house?
                            </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => this.setState({ deleteDialogOpen: false })} color="primary" autoFocus>
                                    Cancel
                                </Button>
                                <Button onClick={this.handleDelete} color="primary">
                                    Delete
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                }

                <Card className={classes.card}>
                    <CardHeader
                        avatar={
                            <Avatar className={classes.avatar}>
                                {this.state.userinfo.username.charAt(0)}
                            </Avatar>
                        }
                        action={
                            <CardActions>
                                {this.state.userinfo.u_id === '' ? <Button size="small" disabled >CONTACT SELLER</Button> : 
                                    <Button size="small" onClick={() => this.props.history.push('/userinfo/' + this.state.userinfo.u_id)}>CONTACT SELLER</Button>}
                            </CardActions>
                        }
                        title = {this.state.userinfo.username}
                        subheader = {this.state.userinfo.email}
                    />

                    <this.StreetViewPanorama center={ {lat: this.state.info.latitude, lng: this.state.info.longitude} } />
                    <CardContent>
                        <Typography variant="headline">
                            {this.state.addr}
                        </Typography>
                        <Typography color = "primary" variant="headline">
                            <Grid container spacing={8}>
                                <Grid item xs>
                                {this.state.info.bedroomCnt} BEDROOMS
                                </Grid>
                                <Grid item xs>
                                {this.state.info.bathroomCnt} BATHROOMS
                                </Grid>
                                <Grid item xs>
                                {this.state.info.livingAreaSize} SQFT
                                </Grid>
                            </Grid>
                        </Typography>
                        <Typography color = "secondary" variant="display1">
                            ${this.state.info.price}
                        </Typography>  
                    </CardContent>

                    <CardActions className={classes.actions} disableActionSpacing>
                        {localStorage.getItem('buyer') === 'yes' ?
                            <IconButton aria-label="Add to favorites" onClick={() => this.handleLikeUnlike(!this.state.liked) } >
                                {this.state.liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                            </IconButton> : 
                            <IconButton aria-label="Add to favorites" disabled >
                                <FavoriteBorderIcon />
                            </IconButton>
                        }
                        <Typography variant="caption">{this.state.likesCount}</Typography>
                        <IconButton aria-label="Viewed" disabled >
                            <VisibilityIcon />
                        </IconButton>
                        <Typography variant="caption">{this.state.viewedCount}</Typography>
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
                                <Typography paragraph variant="title">
                                    Detailed Information:
                                </Typography>
                                <Typography paragraph>Year Built: {this.state.info.yearBuilt}</Typography>
                                <Typography>Building Quality: {this.state.info.buildingQualityID}</Typography>
                                <Typography paragraph variant="caption">(from 1 to 10 with 10 the best)</Typography>
                                <Typography paragraph>Number of Stories: {this.state.info.storyNum}</Typography>
                                <Typography paragraph>Lot Size: {this.state.info.lotSize} Sqft</Typography>
                                <Typography paragraph>Total Price: ${this.state.info.price}</Typography>
                                <Typography paragraph>Tax: ${this.state.info.tax} per year</Typography>
                            </CardContent>
                            {localStorage.getItem('buyer') === 'yes' && localStorage.getItem('u_id') !== this.state.info.u_id && 
                                <Button className={classes.button} variant='raised' color='secondary' size="small" onClick={() => 
                                    this.houseService.buyHouse(this.state.info.h_id)
                                        .then(() => {
                                            alert('Congratulations!! The house is yours!!');
                                            this.props.history.push('/home');
                                        })
                                        .catch((err) => alert('Something went wrong, please try again.'))}>
                                    BUY
                                </Button>}
                        </Collapse>
                </Card>

            </div>
        )
    }
}

HouseInfo.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HouseInfo));
