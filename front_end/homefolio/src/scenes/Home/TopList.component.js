import React from 'react';
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

class HouseCheckbox extends React.Component {
    render() {
        return (
            <Checkbox onChange={(event, checked) => {
                if(checked)
                    this.props.onAddHouse(this.props.h_id);
                else
                    this.props.onRemoveHouse(this.props.h_id);
            }} />
        )
    }
}

class AddCompareButton extends React.Component {
    addHouses = () => {
        for(var index in this.props.selected)
            this.props.onAddToCompare(this.props.selected[index]);
    }

    render() {
        return (
            <Button
                variant='raised'
                primary='true'
                color='secondary'
                onClick={this.addHouses} >
                Add to compare
            </Button>
        )
    }
}

class Container extends React.Component {
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
        const { value } = this.state;

        return (
            <div>
                <AppBar position='static'>
                    <Tabs value={value} onChange={this.handleChange}>
                        <Tab label='Most liked' />
                        <Tab label='Most viewed' />
                    </Tabs>
                    <AddCompareButton selected={this.props.selected} onAddToCompare={this.props.onAddToCompare} />    
                </AppBar>
                {value === 0 && <Paper style={{ maxHeight: '60vh', overflow: 'auto' }}>
                    <List component='nav'>
                        {this.state.topLikes.map((house, index) =>
                            <ListItem key={index}>
                                <HouseListItem latlng={{ lat: house.latitude, lng: house.longitude }} />
                                <ListItemText primary={house.likes} />
                                <ListItemSecondaryAction>
                                    <HouseCheckbox h_id={house.h_id} onAddHouse={this.props.onAddHouse} onRemoveHouse={this.props.onRemoveHouse} />
                                </ListItemSecondaryAction>
                            </ListItem>)}
                    </List>
                </Paper>}
                {value === 1 && <Paper style={{ maxHeight: '60vh', overflow: 'auto' }}>
                    <List component='nav'>
                        {this.state.topViewed.map((house, index) =>
                            <ListItem key={index}>
                                <HouseListItem latlng={{ lat: house.latitude, lng: house.longitude }} />
                                <ListItemText primary={house.views} />
                                <ListItemSecondaryAction>
                                    <HouseCheckbox h_id={house.h_id} onAddHouse={this.props.onAddHouse} onRemoveHouse={this.props.onRemoveHouse} />
                                </ListItemSecondaryAction>
                            </ListItem>)}
                    </List>
                </Paper>}
            </div>
        )
    }
}

class TopList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: []
        }
    }

    onAddHouse = (target) => {
        var temp = this.state.selected;
        temp.push(target);
        this.setState({ selected: temp })
    }

    onRemoveHouse = (target) => {
        var temp = this.state.selected;
        var index = temp.indexOf(target);
        temp.splice(index, 1);
        this.setState({ selected: temp })
    }

    render() {
        return (
            <Container
                bounds={this.props.bounds}
                selected={this.state.selected}
                onAddToCompare={this.props.onAddToCompare}
                onAddHouse={this.onAddHouse}
                onRemoveHouse={this.onRemoveHouse}
            />
        )
    }
}

TopList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TopList);
