import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import NavBar from '../../components/NavBar/NavBar.component';
import HouseService from '../../services/house.service';
import UserService from '../../services/user.service';
import classnames from 'classnames';
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, StreetViewPanorama } from "react-google-maps";
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
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

const styles = theme => ({
    card: {
        width: '50%',
        margin: '0 auto',
    },
      media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
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
        backgroundColor: teal[500],
    },
});

class UserInfo extends React.Component {

    constructor(props) {
        super(props);

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

        }
    }
    state = { expanded: false };

    handleExpandClick = () => {
        this.setState({ expanded: !this.state.expanded });
    };

    componentDidMount = async () => {
        await this.userService.fetchUserInfo(this.props.match.params['u_id']).then((result) => {this.setState({ userinfo: result })});
    }

    render() {
        const { classes } = this.props;

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
                    <IconButton aria-label="Add to favorites">
                    <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="Share">
                    <ShareIcon />
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
                    <Typography paragraph variant="body2">
                        Method:
                    </Typography>
                    <Typography paragraph>
                        Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                        minutes.
                    </Typography>
                    <Typography paragraph>
                        Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                        heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                        browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving
                        chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion,
                        salt and pepper, and cook, stirring often until thickened and fragrant, about 10
                        minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                    </Typography>
                    <Typography paragraph>
                        Add rice and stir very gently to distribute. Top with artichokes and peppers, and
                        cook without stirring, until most of the liquid is absorbed, 15 to 18 minutes.
                        Reduce heat to medium-low, add reserved shrimp and mussels, tucking them down into
                        the rice, and cook again without stirring, until mussels have opened and rice is
                        just tender, 5 to 7 minutes more. (Discard any mussels that don’t open.)
                    </Typography>
                    <Typography>
                        Set aside off of the heat to let rest for 10 minutes, and then serve.
                    </Typography>
                    </CardContent>
                </Collapse>
                </Card>

            </div>
        )
    }
}

UserInfo.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserInfo);
