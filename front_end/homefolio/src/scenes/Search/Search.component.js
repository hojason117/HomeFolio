import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Select from 'material-ui/Select';
import Grid from 'material-ui/Grid';
import { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
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
        width: 105,
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
});

const mapStateToProps = state => {
    return { searchConditions: state.searchConditions };
};

const mapDispatchToProps = dispatch => {
    return {
        searchHousesResultChanged: result => dispatch(searchHousesResultChanged(result)),
        searchConditionChanged: newConditions => dispatch(searchConditionChanged(newConditions))
    };
};

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.service = new HouseService();
        this.state = {
            zip: '',
            minPrice: '',
            maxPrice: '',
            bedroomCnt: '',
            bathroomCnt: '',
            buildingQuality: '',
            story: '',
            livingArea: '',
            lotSize: '',
            yearBuilt: '',
            dialogOpen: false
        }
    }
    
    handleDialogCancel = () => {
        this.setState({ dialogOpen: false });
    }

    handleApply = () => {
        this.setState({ dialogOpen: false });
        this.props.searchConditionChanged({
            zip: this.state.zip,
            minPrice: this.state.minPrice,
            maxPrice: this.state.maxPrice,
            bedroomCnt: this.state.bedroomCnt,
            bathroomCnt: this.state.bathroomCnt,
            buildingQuality: this.state.buildingQuality,
            story: this.state.story,
            livingArea: this.state.livingArea,
            lotSize: this.state.lotSize,
            yearBuilt: this.state.yearBuilt,
        });
        this.service.searchHouse(this.state.zip, this.state.minPrice, this.state.maxPrice, this.state.bedroomCnt, this.state.bathroomCnt,
            this.state.buildingQuality, this.state.story, this.state.livingArea, this.state.lotSize, this.state.yearBuilt, 30)
            .then((result) => this.props.searchHousesResultChanged(result));
    }

    handleReset = () => {
        this.setState({
            zip: '',
            minPrice: '',
            maxPrice: '',
            bedroomCnt: '',
            bathroomCnt: '',
            buildingQuality: '',
            story: '',
            livingArea: '',
            lotSize: '',
            yearBuilt: '',
        });
        this.props.searchConditionChanged({
            zip: '',
            minPrice: '',
            maxPrice: '',
            bedroomCnt: '',
            bathroomCnt: '',
            buildingQuality: '',
            story: '',
            livingArea: '',
            lotSize: '',
            yearBuilt: '',
        });
        this.props.searchHousesResultChanged([]);
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
                    <DialogTitle>Please select your preference</DialogTitle>
                    <DialogContent>
                        <form className={classes.container}>
                            <TextField
                                required
                                id='zip'
                                className={classes.textField}
                                label='Zip'
                                placeholder='Zip'
                                value={this.state.zip}
                                onChange={event => this.setState({ zip: event.target.value })}
                            />
                            <FormControl className={classes.formControl}>
                                <InputLabel>Min Price</InputLabel>
                                <Select
                                    required
                                    id='minPrice'
                                    label='Min Price'
                                    value={this.state.minPrice}
                                    className={classes.selects}
                                    name="minPrice"
                                    input={<Input id="minPrice" />}
                                    onChange={event => { this.setState({ [event.target.name]: event.target.value }) }}
                                >
                                    <MenuItem value="">
                                        <em>Any</em>
                                    </MenuItem>
                                    <MenuItem value={50000}>$50,000+</MenuItem>
                                    <MenuItem value={75000}>$75,000+</MenuItem>
                                    <MenuItem value={100000}>$100,000+</MenuItem>
                                    <MenuItem value={150000}>$150,000+</MenuItem>
                                    <MenuItem value={200000}>$200,000+</MenuItem>
                                    <MenuItem value={250000}>$250,000+</MenuItem>
                                    <MenuItem value={300000}>$300,000+</MenuItem>
                                    <MenuItem value={400000}>$400,000+</MenuItem>
                                    <MenuItem value={500000}>$500,000+</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <InputLabel>Max Price</InputLabel>
                                <Select
                                    required
                                    id='maxPrice'
                                    label='Max Price'
                                    value={this.state.maxPrice}
                                    className={classes.selects}
                                    name="maxPrice"
                                    onChange={event => { this.setState({ [event.target.name]: event.target.value }) }}
                                >
                                    <MenuItem value="">
                                        <em>Any</em>
                                    </MenuItem>
                                    <MenuItem value={100000}>$100,000</MenuItem>
                                    <MenuItem value={200000}>$200,000</MenuItem>
                                    <MenuItem value={300000}>$300,000</MenuItem>
                                    <MenuItem value={400000}>$400,000</MenuItem>
                                    <MenuItem value={500000}>$500,000</MenuItem>
                                    <MenuItem value={600000}>$600,000</MenuItem>
                                    <MenuItem value={700000}>$700,000</MenuItem>
                                    <MenuItem value={800000}>$800,000</MenuItem>
                                    <MenuItem value={900000}>$900,000</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <InputLabel>Bedrooms</InputLabel>
                                <Select
                                    required
                                    id='bedroomCnt'
                                    label='bedroomCnt'
                                    value={this.state.bedroomCnt}
                                    className={classes.selects}
                                    name="bedroomCnt"
                                    onChange={event => { this.setState({ [event.target.name]: event.target.value }) }}
                                >
                                    <MenuItem value="">
                                        <em>Any</em>
                                    </MenuItem>
                                    <MenuItem value={1}>1+</MenuItem>
                                    <MenuItem value={2}>2+</MenuItem>
                                    <MenuItem value={3}>3+</MenuItem>
                                    <MenuItem value={4}>4+</MenuItem>
                                    <MenuItem value={5}>5+</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <InputLabel>Bathrooms</InputLabel>
                                <Select
                                    required
                                    id='bathroomCnt'
                                    label='bathroomCnt'
                                    value={this.state.bathroomCnt}
                                    className={classes.selects}
                                    name="bathroomCnt"
                                    onChange={event => { this.setState({ [event.target.name]: event.target.value }) }}
                                >
                                    <MenuItem value="">
                                        <em>Any</em>
                                    </MenuItem>
                                    <MenuItem value={1}>1+</MenuItem>
                                    <MenuItem value={2}>2+</MenuItem>
                                    <MenuItem value={3}>3+</MenuItem>
                                    <MenuItem value={4}>4+</MenuItem>
                                    <MenuItem value={5}>5+</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <InputLabel>Story</InputLabel>
                                <Select
                                    required
                                    id='story'
                                    label='story'
                                    value={this.state.story}
                                    className={classes.selects}
                                    name="story"
                                    onChange={event => { this.setState({ [event.target.name]: event.target.value }) }}
                                >
                                    <MenuItem value="">
                                        <em>Any</em>
                                    </MenuItem>
                                    <MenuItem value={1}>1+</MenuItem>
                                    <MenuItem value={2}>2+</MenuItem>
                                    <MenuItem value={3}>3+</MenuItem>
                                    <MenuItem value={4}>4+</MenuItem>
                                    <MenuItem value={5}>5+</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <InputLabel>Building Quality</InputLabel>
                                <Select
                                    required
                                    id='buildingQuality'
                                    label='buildingQuality'
                                    value={this.state.buildingQuality}
                                    className={classes.selects}
                                    name="buildingQuality"
                                    onChange={event => { this.setState({ [event.target.name]: event.target.value }) }}
                                >
                                    <MenuItem value="">
                                        <em>Any</em>
                                    </MenuItem>
                                    <MenuItem value={1}>1+</MenuItem>
                                    <MenuItem value={2}>2+</MenuItem>
                                    <MenuItem value={3}>3+</MenuItem>
                                    <MenuItem value={4}>4+</MenuItem>
                                    <MenuItem value={5}>5+</MenuItem>
                                    <MenuItem value={6}>6+</MenuItem>
                                    <MenuItem value={7}>7+</MenuItem>
                                    <MenuItem value={9}>8+</MenuItem>
                                    <MenuItem value={9}>9+</MenuItem>
                                    <MenuItem value={10}>10</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <InputLabel>Living Area</InputLabel>
                                <Select
                                    required
                                    id='livingArea'
                                    label='livingArea'
                                    value={this.state.livingArea}
                                    className={classes.selects}
                                    name="livingArea"
                                    onChange={event => { this.setState({ [event.target.name]: event.target.value }) }}
                                >
                                    <MenuItem value="">
                                        <em>Any</em>
                                    </MenuItem>
                                    <MenuItem value={500}>500+ sqft</MenuItem>
                                    <MenuItem value={1000}>1,000+ sqft</MenuItem>
                                    <MenuItem value={1500}>1,500+ sqft</MenuItem>
                                    <MenuItem value={2000}>2,000+ sqft</MenuItem>
                                    <MenuItem value={2500}>2,500+ sqft</MenuItem>
                                    <MenuItem value={3000}>3,000+ sqft</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <InputLabel>Lot Size</InputLabel>
                                <Select
                                    required
                                    id='lotSize'
                                    label='lotSize'
                                    value={this.state.lotSize}
                                    className={classes.selects}
                                    name="lotSize"
                                    onChange={event => { this.setState({ [event.target.name]: event.target.value }) }}
                                >
                                    <MenuItem value="">
                                        <em>Any</em>
                                    </MenuItem>
                                    <MenuItem value={1000}>1,000+ sqft</MenuItem>
                                    <MenuItem value={3000}>3,000+ sqft</MenuItem>
                                    <MenuItem value={5000}>5,000+ sqft</MenuItem>
                                    <MenuItem value={7000}>7,000+ sqft</MenuItem>
                                    <MenuItem value={9000}>9,000+ sqft</MenuItem>
                                    <MenuItem value={11000}>11,000+ sqft</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <InputLabel>Year Built</InputLabel>
                                <Select
                                    required
                                    id='yearBuilt'
                                    label='yearBuilt'
                                    value={this.state.yearBuilt}
                                    className={classes.selects}
                                    name="yearBuilt"
                                    onChange={event => { this.setState({ [event.target.name]: event.target.value }) }}
                                >
                                    <MenuItem value="">
                                        <em>Any</em>
                                    </MenuItem>
                                    <MenuItem value={1950}>1950+</MenuItem>
                                    <MenuItem value={1960}>1960+</MenuItem>
                                    <MenuItem value={1970}>1970+</MenuItem>
                                    <MenuItem value={1980}>1980+</MenuItem>
                                    <MenuItem value={1990}>1990+</MenuItem>
                                    <MenuItem value={1990}>1990+</MenuItem>
                                    <MenuItem value={2000}>2000+</MenuItem>
                                    <MenuItem value={2010}>2010+</MenuItem>
                                </Select>
                            </FormControl>
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
                            color='primary'
                            onClick={this.handleApply} >
                            Apply
                        </Button>
                    </DialogActions>
                </Dialog>

                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <NavBar />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant='raised'
                            primary='true'
                            className={classes.button}
                            color='primary'
                            size='large'
                            onClick={() => this.setState({ dialogOpen: true })} >
                            Refine by
                        </Button>
                        <Button
                            variant='raised'
                            primary='true'
                            className={classes.button}
                            color='secondary'
                            size='large'
                            onClick={this.handleReset} >
                            Reset
                        </Button>
                    </Grid>
                </Grid>
                <Grid container spacing={8} alignItems='flex-start'>
                    <Grid item xs={8}>
                        <div style={{ height: '75vh' }}>
                            <Map />
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div style={{ height: '75vh' }}>
                            <SearchList />
                        </div>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

Search.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Search));
