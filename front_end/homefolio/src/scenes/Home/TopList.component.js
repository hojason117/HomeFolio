import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Button from 'material-ui/Button';
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Checkbox from 'material-ui/Checkbox';
import HouseService from '../../services/house.service';

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    }
});

const TabContainer = (props) => {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
}

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

class TopList extends React.Component {
    constructor(props) {
        super(props);
        this.service = new HouseService();
        this.state = ({
            value: 0,
            topLikes: [],
            topViewed: []
        })
    }

    componentWillReceiveProps(nextProps) {
        this.service.fetchTopLikedHouses(nextProps.bounds, 10).then((result) => { this.setState({ topLikes: result }) });
        this.service.fetchTopViewedHouses(nextProps.bounds, 10).then((result) => { this.setState({ topViewed: result }) });
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <div className={classes.root}>
                <AppBar position='static'>
                    <Tabs value={value} onChange={this.handleChange}>
                        <Tab label='Most liked' />
                        <Tab label='Most viewed' />
                    </Tabs>
                    <Button
                        variant='raised'
                        primary='true'
                        className={classes.button}
                        color='secondary' >
                        Add to compare
                    </Button>
                </AppBar>
                {value === 0 && <TabContainer>
                    <List component='nav'>
                        {this.state.topLikes.map((house, index) =>
                            <ListItem key={index}>
                                <HouseListItem latlng={{ lat: house.latitude, lng: house.longitude }} />
                                <ListItemText primary={house.likes} />
                                <ListItemSecondaryAction>
                                    <Checkbox/>
                                </ListItemSecondaryAction>
                            </ListItem>)}
                    </List>
                </TabContainer>}
                {value === 1 && <TabContainer>
                    <List component='nav'>
                        {this.state.topViewed.map((house, index) =>
                            <ListItem key={index}>
                                <HouseListItem latlng={{ lat: house.latitude, lng: house.longitude }} />
                                <ListItemText primary={house.views} />
                                <ListItemSecondaryAction>
                                    <Checkbox />
                                </ListItemSecondaryAction>
                            </ListItem>)}
                    </List>
                </TabContainer>}
            </div>
        )
    }
}

TopList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TopList);
