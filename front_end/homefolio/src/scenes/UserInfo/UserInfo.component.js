import React from 'react';
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

/*select h.* from CHHO.ACC_USER a, CHHO.HOUSE h
where a.U_ID = h.U_ID and a.U_ID = '93cd56c2-d02c-4d3d-9a7a-abdbc510bb2c';

select h.* from CHHO.ACC_USER a, CHHO.HOUSE h, CHHO.LIKES l
where a.U_ID = l.U_ID and l.H_ID = h.H_ID
and a.U_ID = 'b7771ed7-1484-4a1e-a867-8cbc34201a83'; */

const styles = theme => ({
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

    render() {
        const { classes } = this.props;
        const { expanded } = this.state;

        return (
            <div>
                <NavBar />
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
                        <Typography paragraph>Introduction: </Typography>
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

export default withStyles(styles)(UserInfo);
