import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { searchMapFocusedMarkerChanged, searchMapHoveredMarkerChanged } from '../../redux/actions/main';
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
    return { 
        focus: state.searchMapFocusedMarker,
        hover: state.searchMapHoveredMarker
    };
};

const mapDispatchToProps = dispatch => {
    return { 
        searchMapFocusedMarkerChanged: newFocused => dispatch(searchMapFocusedMarkerChanged(newFocused)),
        searchMapHoveredMarkerChanged: newFocused => dispatch(searchMapHoveredMarkerChanged(newFocused))
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
        if (nextProps.focus !== this.props.focus)
            this.setState({ isOpen: (nextProps.focus === this.props.listId) ? true : false });
        if(nextProps.info !== this.props.info)
            this.service.getHouseAddress(nextProps.info.lat, nextProps.info.lng).then((result) => this.setState({ addr: result }));
    }

    componentDidMount() {
        //this.service.getHouseAddress(this.props.info.lat, this.props.info.lng).then((result) => this.setState({ addr: result }));
    }

    onClick = () => {
        if(this.state.addr === '')
            this.service.getHouseAddress(this.props.info.lat, this.props.info.lng).then((result) => this.setState({ addr: result }));
        this.props.searchMapFocusedMarkerChanged(this.state.isOpen ? -1 : this.props.listId);
    }

    onCloseClick = () => {
        this.props.searchMapFocusedMarkerChanged(-1);
    }

    handleMouseOver = () => {
        this.props.searchMapHoveredMarkerChanged(this.props.listId);
    }

    handleMouseOut = () => {
        this.props.searchMapHoveredMarkerChanged(-1);
    }

    render() {
        const { classes } = this.props;

        return (
            <Marker position={this.props.info} onClick={this.onClick} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut} >
                {this.state.isOpen && <InfoWindow onCloseClick={this.onCloseClick}>
                    <div>
                        <Typography variant='title' color='inherit' className={classes.flex} >
                            {this.state.addr}
                        </Typography>
                        <Button
                            variant='raised'
                            primary='true'
                            className={classes.button}
                            color='secondary'
                            component={Link}
                            to={'/houseinfo/'+this.props.info.h_id} >
                            Detail
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
