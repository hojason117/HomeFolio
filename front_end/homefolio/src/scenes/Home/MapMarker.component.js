import React from 'react';
import PropTypes from 'prop-types';
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
        this.setState({ isOpen: (nextProps.focus === this.props.listId) ? true : false });
        this.service.getHouseAddress(nextProps.info.lat, nextProps.info.lng).then((result) => this.setState({ addr: result }));
    }

    componentDidMount() {
        this.service.getHouseAddress(this.props.info.lat, this.props.info.lng).then((result) => this.setState({ addr: result }));
    }

    onClick = () => {
        this.props.onFocusChanged(this.state.isOpen ? -1 : this.props.listId);
    }

    onCloseClick = () => {
        this.props.onFocusChanged(-1);
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
                            color='secondary' >
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
};

export default withStyles(styles)(MapMarker);
