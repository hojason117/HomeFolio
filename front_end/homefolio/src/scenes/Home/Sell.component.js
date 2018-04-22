import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Select from 'material-ui/Select';
import Grid from 'material-ui/Grid';
import { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import Chip from 'material-ui/Chip';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import HouseService from '../../services/house.service';
import NavBar from '../../components/NavBar/NavBar.component';
import Map from '../../scenes/Search/Map.component';
import SearchList from '../../scenes/Search/SearchList.component';
import { searchHousesResultChanged, searchConditionChanged } from '../../redux/actions/main';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 130,
    },
    middleTextField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 180,
    },
    longTextField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 500,
    },
    selects: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 150,
    },
    button: {
        margin: theme.spacing.unit,
    },
    root: {
        flexGrow: 10,
    },
    flex: {
        flex: 1,
    },
    chip: {
        margin: theme.spacing.unit / 2,
    }
});

class Sell extends React.Component {
    constructor(props) {
        super(props);
        this.service = new HouseService();
        this.state = {
            addr: '',
            u_id: '',
            zip: '',
            price: '0',
            tax: '0',
            bedroomCnt: '0',
            bathroomCnt: '0',
            buildingQuality: '5',
            story: '1',
            livingArea: '0',
            lotSize: '0',
            yearBuilt: '1900',
            cityid: '12447',
            county: 'Los Angeles',
            lng: '0',
            lat: '0',
            dialogOpen: true,
        }
    }
    
    handleDialogCancel = () => {
        this.setState({ dialogOpen: false });
    }

    handleInsert = async () => {
        this.setState({ dialogOpen: false });
        await this.service.getHouseLatLng(this.state.addr).then((result) => {this.setState({ lat: result.lat, lng: result.lng})});
        this.service.searchHouse(this.state.zip, this.state.minPrice, this.state.maxPrice, this.state.bedroomCnt, this.state.bathroomCnt,
            this.state.buildingQuality, this.state.story, this.state.livingArea, this.state.lotSize, this.state.yearBuilt, 30)
            .then();
        // should be an insert function
    }

    handleReset = () => {
        this.setState({
            addr: '',
            zip: '',
            price: '0',
            tax: '0',
            bedroomCnt: '0',
            bathroomCnt: '0',
            buildingQuality: '5',
            story: '1',
            livingArea: '0',
            lotSize: '0',
            yearBuilt: '1900',
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    open={this.state.dialogOpen}
                    onClose={this.handleClose}
                >
                    <DialogTitle>Please input your house's information</DialogTitle>
                    <DialogContent>
                        <form className={classes.container}>
                            <TextField
                                required
                                id='addr'
                                className={classes.longTextField}
                                label='Address'
                                placeholder = 'Address'
                                value={this.state.addr}
                                margin="dense"
                                helperText="Please use US standard address format"
                                onChange={event => this.setState({ addr: event.target.value })}
                            />
                            <TextField
                                required
                                id='zip'
                                className={classes.textField}
                                label='Zip'
                                placeholder='Zip'
                                value={this.state.zip}
                                margin="dense"
                                onChange={event => this.setState({ zip: event.target.value })}
                                inputProps={{ maxLength: 5, }}
                            />
                            <TextField
                                required
                                id='price'
                                className={classes.textField}
                                label='Price'
                                placeholder='Price'
                                value={this.state.price}
                                margin="dense"
                                onChange={event => this.setState({ price: event.target.value })}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                }}
                            />
                            <TextField
                                required
                                id='tax'
                                className={classes.textField}
                                label='Tax'
                                placeholder='Tax'
                                value={this.state.tax}
                                margin="dense"
                                onChange={event => this.setState({ tax: event.target.value })}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                }}
                            />
                            <TextField
                                required
                                id='bedroomCnt'
                                className={classes.middleTextField}
                                label='Bedroom Number'
                                placeholder='Number of bedrooms'
                                value={this.state.bedroomCnt}
                                margin="dense"
                                onChange={event => this.setState({ bedroomCnt: event.target.value })}
                                type="number"
                                InputLabelProps={{ shrink: true,}}
                            />
                            <TextField
                                required
                                id='bathroomCnt'
                                className={classes.middleTextField}
                                label='Bathroom Number'
                                placeholder='Number of bathrooms'
                                value={this.state.bathroomCnt}
                                margin="dense"
                                onChange={event => this.setState({ bathroomCnt: event.target.value })}
                                type="number"
                                InputLabelProps={{ shrink: true,}}
                            />
                            <TextField
                                required
                                id='story'
                                className={classes.middleTextField}
                                label='Story'
                                placeholder='Number of stories'
                                value={this.state.story}
                                margin="dense"
                                onChange={event => this.setState({ story: event.target.value })}
                                type="number"
                                InputLabelProps={{ shrink: true,}}
                            />
                            <TextField
                                required
                                id='livingArea'
                                className={classes.textField}
                                label='Living Area'
                                placeholder='livingArea'
                                value={this.state.livingArea}
                                margin="dense"
                                onChange={event => this.setState({ livingArea: event.target.value })}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">Sqft</InputAdornment>,
                                }}
                            />
                            <TextField
                                required
                                id='lotSize'
                                className={classes.textField}
                                label='Lot size'
                                placeholder='lotSize'
                                value={this.state.lotSize}
                                margin="dense"
                                onChange={event => this.setState({ lotSize: event.target.value })}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">Sqft</InputAdornment>,
                                }}
                            />
                            <FormControl className={classes.formControl}>
                                <InputLabel>Building Quality</InputLabel>
                                <Select
                                    id='buildingQuality'
                                    label='buildingQuality'
                                    value={this.state.buildingQuality}
                                    className={classes.selects}
                                    name="buildingQuality"
                                    onChange={event => { this.setState({ [event.target.name]: event.target.value }) }}
                                >
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                    <MenuItem value={5}>5</MenuItem>
                                    <MenuItem value={6}>6</MenuItem>
                                    <MenuItem value={7}>7</MenuItem>
                                    <MenuItem value={9}>8</MenuItem>
                                    <MenuItem value={9}>9</MenuItem>
                                    <MenuItem value={10}>10</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                required
                                id='yearBuilt'
                                className={classes.textField}
                                label='Built year'
                                placeholder='yearBuilt'
                                value={this.state.yearBuilt}
                                margin="dense"
                                onChange={event => this.setState({ yearBuilt: event.target.value })}
                                inputProps={{ maxLength: 4, }}
                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleDialogCancel} color="primary">
                            Cancel
                        </Button>
                        <Button
                            variant='raised'
                            primary='true'
                            className={classes.button}
                            color='secondary'
                            onClick={this.handleReset} >
                            Reset
                        </Button>
                        <Button
                            variant='raised'
                            primary='true'
                            className={classes.button}
                            color='primary'
                            onClick={this.handleInsert} >
                            Insert
                        </Button>
                    </DialogActions>
                </Dialog>

                <NavBar />
            </div>
        )
    }
}

Sell.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default (withStyles(styles)(Sell));
