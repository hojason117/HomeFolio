import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { Marker, InfoWindow } from "react-google-maps";
import DataService from '../../services/data.service';
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
        this.service = new DataService();
        this.state = {
            isOpen: false, 
            addr: ''
        }
    }

    render() {
        const { classes } = this.props;

        if (this.state.isOpen && this.state.addr === '')
            this.service.getHouseAddress(this.props.info.lat, this.props.info.lng).then((result) => this.setState({ addr: result }));

        return (
            <Marker position={this.props.info} onClick={() => { this.setState({isOpen: !this.state.isOpen}) }}>
                {this.state.isOpen && <InfoWindow onCloseClick={() => { this.setState({ isOpen: !this.state.isOpen }) }}>
                    <div>
                        <Typography variant='headline' color='inherit' className={classes.flex} >
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
                            Compare
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
