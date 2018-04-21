import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import NavBar from '../../components/NavBar/NavBar.component';
import HouseService from '../../services/house.service';
import UserService from '../../services/user.service';
import classnames from 'classnames';
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, StreetViewPanorama } from "react-google-maps";
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import teal from 'material-ui/colors/teal';
import FavoriteIcon from '@material-ui/icons/Favorite';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from 'material-ui/Button';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from 'material-ui/Tooltip';
import Grid from 'material-ui/Grid';
import { Link } from 'react-router-dom';



import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExpansionPanel, {
    ExpansionPanelDetails,
    ExpansionPanelSummary,
  } from 'material-ui/ExpansionPanel';
import Icon from 'material-ui/Icon';
import bluegrey from 'material-ui/colors/blueGrey';
import HomeIcon from '@material-ui/icons/Home';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';


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
        this.service = new HouseService();
        this.state = {
            addr: ''
        }
    }

    componentDidMount() {
        this.service.getHouseAddress(this.props.latlng.lat, this.props.latlng.lng).then((result) => this.setState({ addr: result }));
    }

    componentWillReceiveProps(nextProps) {
        this.service.getHouseAddress(nextProps.latlng.lat, nextProps.latlng.lng).then((result) => this.setState({ addr: result }));
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
        this.service = new HouseService();
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
                seller: '',
                buyer: ''
            },
            ownList: []
        }
    }

    state = { expanded: null };

    handleChange = panel => (event, expanded) => {
        this.setState({ expanded: expanded ? panel : false, });
    };

    componentDidMount = async () => {
        await this.userService.fetchUserInfo(this.props.match.params['u_id']).then((result) => {this.setState({ userinfo: result })});

        this.service.fetchTopLikedHouses(this.props.bounds, 10).then((result) => { this.setState({ topLikes: result }) });
        this.service.fetchTopViewedHouses(this.props.bounds, 10).then((result) => { this.setState({ topViewed: result }) });
    }

    componentWillReceiveProps(nextProps) {
        this.service.fetchTopLikedHouses(nextProps.bounds, 10).then((result) => { this.setState({ topLikes: result }) });
        this.service.fetchTopViewedHouses(nextProps.bounds, 10).then((result) => { this.setState({ topViewed: result }) });
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
                        <Typography paragraph>Introduction: {this.state.userinfo.bio}</Typography>
                        <Typography paragraph variant="caption">(This user hasn't written anything yet.)</Typography>
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
                                    <ListItem key={index}>
                                        <HouseListItem latlng={{ lat: house.latitude, lng: house.longitude }} />
                                        <ListItemText primary={house.likes} />
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
                            <Typography>
                            Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar
                            diam eros in elit. Pellentesque convallis laoreet laoreet.
                            </Typography>
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
                            <Typography>
                            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas
                            eros, vitae egestas augue. Duis vel est augue.
                            </Typography>
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
