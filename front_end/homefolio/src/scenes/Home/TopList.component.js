import React from 'react';
import { connect } from "react-redux";
import { addCompareHouses } from '../../redux/actions/main';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import HouseService from '../../services/house.service';

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    }
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

HouseListItem.propTypes = {
    latlng: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return { bounds: state.homeMapBound };
};

const mapDispatchToProps = dispatch => {
    return { addCompareHouses: house => dispatch(addCompareHouses(house)) };
};

class TopList extends React.Component {
    constructor(props) {
        super(props);
        this.service = new HouseService();
        this.state = ({
            tab: 0,
            topLikes: [],
            topViewed: [],
            selected: []
        })
    }

    HouseCheckbox = (props) => {
        const handleChange = (checked) => {
            if (checked)
                addHouse(props.h_id);
            else
                removeHouse(props.h_id);
        }

        const addHouse = (target) => {
            var temp = this.state.selected;
            temp.push(target);
            this.setState({ selected: temp })
        }

        const removeHouse = (target) => {
            var temp = this.state.selected;
            var index = temp.indexOf(target);
            temp.splice(index, 1);
            this.setState({ selected: temp })
        }

        return (
            <Checkbox onChange={(event, checked) => handleChange(checked)} />
        )
    }

    componentWillReceiveProps(nextProps) {
        this.service.fetchTopLikedHouses(nextProps.bounds, 10).then((result) => { this.setState({ topLikes: result }) });
        this.service.fetchTopViewedHouses(nextProps.bounds, 10).then((result) => { this.setState({ topViewed: result }) });
    }

    componentDidMount() {
        this.service.fetchTopLikedHouses(this.props.bounds, 10).then((result) => { this.setState({ topLikes: result }) });
        this.service.fetchTopViewedHouses(this.props.bounds, 10).then((result) => { this.setState({ topViewed: result }) });
    }

    handleChange = (event, tab) => {
        this.setState({ tab: tab, selected: [] });
    };

    render() {
        const { tab } = this.state;

        const addAllHouses = () => {
            for(var index in this.state.selected)
                this.props.addCompareHouses(this.state.selected[index]);
        }

        return (
            <div>
                <AppBar position='static'>
                    <Tabs value={tab} onChange={this.handleChange}>
                        <Tab label='Most liked' />
                        <Tab label='Most viewed' />
                    </Tabs>
                    <Button variant='raised'
                        primary='true'
                        color='secondary'
                        onClick={() => addAllHouses()} >
                        Add to compare
                    </Button>
                </AppBar>
                {tab === 0 && <Paper style={{ maxHeight: '60vh', overflow: 'auto' }}>
                    <List component='nav'>
                        {this.state.topLikes.map((house, index) =>
                            <ListItem key={index}>
                                <HouseListItem latlng={{ lat: house.latitude, lng: house.longitude }} />
                                <ListItemText primary={house.likes} />
                                <ListItemSecondaryAction>
                                    <this.HouseCheckbox h_id={house.h_id} />
                                </ListItemSecondaryAction>
                            </ListItem>)}
                    </List>
                </Paper>}
                {tab === 1 && <Paper style={{ maxHeight: '60vh', overflow: 'auto' }}>
                    <List component='nav'>
                        {this.state.topViewed.map((house, index) =>
                            <ListItem key={index}>
                                <HouseListItem latlng={{ lat: house.latitude, lng: house.longitude }} />
                                <ListItemText primary={house.views} />
                                <ListItemSecondaryAction>
                                    <this.HouseCheckbox h_id={house.h_id} />
                                </ListItemSecondaryAction>
                            </ListItem>)}
                    </List>
                </Paper>}
            </div>
        )
    }
}

TopList.propTypes = {
    classes: PropTypes.object.isRequired,
    bounds: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TopList));
