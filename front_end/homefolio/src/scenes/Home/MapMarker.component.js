import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { homeMapFocusedMarkerChanged, addCompareHouses } from '../../redux/actions/main';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { Marker, InfoWindow } from "react-google-maps";
import HouseService from '../../services/house.service';
import { Link } from 'react-router-dom';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    flex: {
        flex: 1,
    }
});

const mapStateToProps = state => {
    return { focus: state.homeMapFocusedMarker };
};

const mapDispatchToProps = dispatch => {
    return {
        addCompareHouses: house => dispatch(addCompareHouses(house)),
        homeMapFocusedMarkerChanged: newFocused => dispatch(homeMapFocusedMarkerChanged(newFocused))
    };
};

class MapMarker extends React.Component {
    constructor(props) {
        super(props);
        this.service = new HouseService();
        this.state = {
            isOpen: false, 
            addr: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.focus !== this.props.focus)
            this.setState({ isOpen: (nextProps.focus === this.props.listId) ? true : false });
        if(nextProps.info !== this.props.info)
            this.service.getHouseAddress(nextProps.info.lat, nextProps.info.lng).then((result) => this.setState({ addr: result }));
    }

    componentDidMount() {
        //this.service.getHouseAddress(this.props.info.lat, this.props.info.lng).then((result) => this.setState({ addr: result }));
    }

    onClick = () => {
        if (this.state.addr === '')
            this.service.getHouseAddress(this.props.info.lat, this.props.info.lng).then((result) => this.setState({ addr: result }));
        this.props.homeMapFocusedMarkerChanged(this.state.isOpen ? -1 : this.props.listId);
    }

    onCloseClick = () => {
        this.props.homeMapFocusedMarkerChanged(-1);
    }

    render() {
        const { classes } = this.props;

        return (
            <Marker position={this.props.info} onClick={() => this.onClick()} >
                {this.state.isOpen && <InfoWindow onCloseClick={() => this.onCloseClick()}>
                    <div>
                        <Typography variant='title' color='inherit' className={classes.flex} >
                            {this.state.addr}
                        </Typography>
                        <Button
                            variant='raised'
                            primary='true'
                            className={classes.button}
                            color='primary'
                            component={Link}
                            to={'/houseinfo/'+this.props.info.h_id} >
                            Detail
                        </Button>
                        <Button
                            variant='raised'
                            primary='true'
                            className={classes.button}
                            color='secondary'
                            onClick={() => this.props.addCompareHouses(this.props.info.h_id)} >
                            Add to compare
                        </Button>
                    </div>
                </InfoWindow>}
            </Marker>
        )
    }
}

MapMarker.propTypes = {
    classes: PropTypes.object.isRequired,
    listId: PropTypes.number.isRequired,
    info: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MapMarker));
