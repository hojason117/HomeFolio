import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import NavBar from '../../components/NavBar/NavBar.component';
import HouseService from '../../services/house.service';
import UserService from '../../services/user.service';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import teal from 'material-ui/colors/teal';
import FavoriteIcon from '@material-ui/icons/Favorite';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel, { ExpansionPanelDetails, ExpansionPanelSummary } from 'material-ui/ExpansionPanel';
import Icon from 'material-ui/Icon';
import bluegrey from 'material-ui/colors/blueGrey';
import HomeIcon from '@material-ui/icons/Home';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { Link } from 'react-router-dom';
import { userUpdateDialogToggled } from '../../redux/actions/main';
import Update from './Update.component';
import Button from 'material-ui/Button';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from 'material-ui/Tooltip';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    card: {
        width: '50%',
        margin: '0 auto',
    },
    actions: {
        display: 'flex',
    },
    avatar: {
        backgroundColor: teal[500],
    },
    root: {
        flexGrow: 1,
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    icon: {
        color: bluegrey[300],
    },
});

const mapStateToProps = state => {
    return { userUpdateDialogOpen: state.userUpdateDialogOpen };
}

const mapDispatchToProps = dispatch => {
    return { userUpdateDialogToggled: newBound => dispatch(userUpdateDialogToggled()) };
};

class HouseListItem extends React.Component {
    constructor(props) {
        super(props);
        this.houseService = new HouseService();
        this.state = {
            addr: ''
        }
    }

    componentDidMount() {
        this.houseService.getHouseAddress(this.props.latlng.lat, this.props.latlng.lng).then((result) => this.setState({ addr: result }));
    }

    componentWillReceiveProps(nextProps) {
        this.houseService.getHouseAddress(nextProps.latlng.lat, nextProps.latlng.lng).then((result) => this.setState({ addr: result }));
    }
    
    render() {
        return (
            <ListItemText primary={this.state.addr} />
        )
    }
}

class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.houseService = new HouseService();
        this.userService = new UserService();
        this.state = {
            userinfo: {
                u_id: '',
                email: '',
                username: '',
                password: '',
                age: 0,
                area: '',
                bio: '',
                seller: false,
                buyer: false
            },
            ownList: [],
            likedList: [],
            viewedList: []
        }
    }

    handleChange = panel => (event, expanded) => {
        this.setState({ expanded: expanded ? panel : false });
    };

    componentDidMount = async () => {
        await this.userService.fetchUserInfo(this.props.match.params['u_id']).then(result => this.setState({ userinfo: result }));
        this.userService.fetchOwnHouse(this.state.userinfo.u_id).then(result => this.setState({ ownList: result }));
        this.userService.fetchLikedHouse(this.state.userinfo.u_id).then(result => this.setState({ likedList: result }));
        this.userService.fetchViewedHouse(this.state.userinfo.u_id).then(result => this.setState({ viewedList: result }));
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.userUpdateDialogOpen !== this.props.userUpdateDialogOpen)
            setTimeout(() => this.userService.fetchUserInfo(this.props.match.params['u_id']).then(result => this.setState({ userinfo: result })), 1500);
    }

    render() {
        const { classes } = this.props;
        const { expanded } = this.state;

        return (
            <div>
                <NavBar />
                <Update />
                {this.state.userinfo.u_id === localStorage.getItem('u_id') &&
                    <Tooltip id="tooltip-fab" title="Edit Profile">
                        <Button variant="fab" mini aria-label="edit" className={classes.button} onClick={() => this.props.userUpdateDialogToggled()} >
                            <EditIcon />
                        </Button>
                    </Tooltip>
                }

                <Card className={classes.card}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="Recipe" className={classes.avatar}>
                                {this.state.userinfo.username.charAt(0)}
                            </Avatar>
                        }
                        title = {this.state.userinfo.username}
                        subheader = "Basic Information:"
                    />
                    <CardContent>
                        <Typography paragraph>Contact Email: {this.state.userinfo.email}</Typography>
                        <Typography paragraph>Age: {this.state.userinfo.age}</Typography>
                        <Typography paragraph>Area: {this.state.userinfo.area}</Typography>
                        <Typography paragraph>Biography: </Typography>
                        {this.state.userinfo.bio !== '' ?  
                            <Typography>{this.state.userinfo.bio}</Typography> : 
                            <Typography variant="caption">(This user hasn't written anything yet.)</Typography>}
                    </CardContent>

                <CardActions className={classes.actions} disableActionSpacing>
                    <div className={classes.root}>
                        <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>Houses OWN</Typography>
                            <Icon className={classes.icon}>
                                <HomeIcon />
                            </Icon>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <List component='nav'>
                                {this.state.ownList.map((house, index) =>
                                    <ListItem button key={index} component={Link} to={'/houseinfo/' + house.h_id} >
                                        <HouseListItem latlng={{ lat: house.latitude, lng: house.longitude }} />
                                    </ListItem>)}
                            </List>
                        </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>Houses LIKED</Typography>
                            <Icon className={classes.icon}>
                                <FavoriteIcon />
                            </Icon>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <List component='nav'>
                                {this.state.likedList.map((house, index) =>
                                    <ListItem button key={index} component={Link} to={'/houseinfo/' + house.h_id} >
                                        <HouseListItem latlng={{ lat: house.latitude, lng: house.longitude }} />
                                    </ListItem>)}
                            </List>
                        </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel expanded={expanded === 'panel3'} onChange={this.handleChange('panel3')}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>Houses VIEWED</Typography>
                            <Icon className={classes.icon}>
                                <VisibilityIcon />
                            </Icon>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <List component='nav'>
                                {this.state.viewedList.map((house, index) =>
                                    <ListItem button key={index} component={Link} to={'/houseinfo/' + house.h_id} >
                                        <HouseListItem latlng={{ lat: house.latitude, lng: house.longitude }} />
                                    </ListItem>)}
                            </List>
                        </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </div>
                </CardActions>
                </Card>
            </div>
        )
    }
}

UserInfo.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UserInfo));
