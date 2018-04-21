import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import HouseService from '../../services/house.service';
import { Link } from 'react-router-dom';

const styles = theme => ({
    flex: {
        flex: 1,
    },
    button: {
        margin: theme.spacing.unit,
    }
});

class HouseAddrListItem extends React.Component {
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

const mapStateToProps = state => {
    return { houses: state.searchHousesResults };
};

const SearchList = (props) => {
    const { classes } = props;

    return (
        <div>
            <AppBar position='static'>
                <Toolbar>
                    <Typography variant="title" color="inherit" className={classes.flex} >
                        Results
                    </Typography>
                </Toolbar>
            </AppBar>
            <Paper style={{ maxHeight: '60vh', overflow: 'auto' }}>
                <List component='nav'>
                    {props.houses.map((house, index) =>
                        <ListItem key={index}>
                            <HouseAddrListItem latlng={{ lat: house.lat, lng: house.lng }} />
                            <ListItemSecondaryAction>
                                <Button
                                    variant='raised'
                                    primary='true'
                                    className={classes.button}
                                    color='primary'
                                    component={Link}
                                    to={'/houseinfo/' + house.h_id} >
                                    Detail
                                </Button>
                            </ListItemSecondaryAction>
                        </ListItem>)}
                </List>
            </Paper>
        </div>
    )
}

SearchList.propTypes = {
    classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(withStyles(styles)(SearchList));
