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
    chip: {
        margin: theme.spacing.unit / 2,
    }
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
        this.searchCount = 15;

        var chips = [];
        if (this.props.searchConditions.zip !== '')
            chips.push({ type: 'zip', label: 'Zip: ' + this.props.searchConditions.zip });
        if (this.props.searchConditions.minPrice !== '')
            chips.push({ type: 'minPrice', label: 'Min Price: ' + this.props.searchConditions.minPrice });
        if (this.props.searchConditions.maxPrice !== '')
            chips.push({ type: 'maxPrice', label: 'Max Price: ' + this.props.searchConditions.maxPrice });
        if (this.props.searchConditions.bedroomCnt !== '')
            chips.push({ type: 'bedroomCnt', label: 'Bedrooms: ' + this.props.searchConditions.bedroomCnt });
        if (this.props.searchConditions.bathroomCnt !== '')
            chips.push({ type: 'bathroomCnt', label: 'Bathrooms: ' + this.props.searchConditions.bathroomCnt });
        if (this.props.searchConditions.story !== '')
            chips.push({ type: 'story', label: 'Story: ' + this.props.searchConditions.story });
        if (this.props.searchConditions.buildingQuality !== '')
            chips.push({ type: 'quality', label: 'Quality: ' + this.props.searchConditions.buildingQuality });
        if (this.props.searchConditions.livingArea !== '')
            chips.push({ type: 'area', label: 'Living area: ' + this.props.searchConditions.livingArea });
        if (this.props.searchConditions.lotSize !== '')
            chips.push({ type: 'lot', label: 'Lot size: ' + this.props.searchConditions.lotSize });
        if (this.props.searchConditions.yearBuilt !== '')
            chips.push({ type: 'year', label: 'Year built: ' + this.props.searchConditions.yearBuilt });

        this.state = {
            zip: this.props.searchConditions.zip,
            minPrice: this.props.searchConditions.minPrice,
            maxPrice: this.props.searchConditions.maxPrice,
            bedroomCnt: this.props.searchConditions.bedroomCnt,
            bathroomCnt: this.props.searchConditions.bathroomCnt,
            buildingQuality: this.props.searchConditions.buildingQuality,
            story: this.props.searchConditions.story,
            livingArea: this.props.searchConditions.livingArea,
            lotSize: this.props.searchConditions.lotSize,
            yearBuilt: this.props.searchConditions.yearBuilt,
            dialogOpen: true,
            chipData: chips
        }
    }
    
    handleDialogCancel = () => {
        this.setState({ dialogOpen: false });
    }

    handleApply = () => {
        var chips = [];
        if (this.state.zip !== '')
            chips.push({ type: 'zip', label: 'Zip: ' + this.state.zip });
        if (this.state.minPrice !== '')
            chips.push({ type: 'minPrice', label: 'Min Price: ' + this.state.minPrice });
        if (this.state.maxPrice !== '')
            chips.push({ type: 'maxPrice', label: 'Max Price: ' + this.state.maxPrice });
        if (this.state.bedroomCnt !== '')
            chips.push({ type: 'bedroomCnt', label: 'Bedrooms: ' + this.state.bedroomCnt });
        if (this.state.bathroomCnt !== '')
            chips.push({ type: 'bathroomCnt', label: 'Bathrooms: ' + this.state.bathroomCnt });
        if (this.state.story !== '')
            chips.push({ type: 'story', label: 'Story: ' + this.state.story });
        if (this.state.buildingQuality !== '')
            chips.push({ type: 'quality', label: 'Quality: ' + this.state.buildingQuality });
        if (this.state.livingArea !== '')
            chips.push({ type: 'area', label: 'Living area: ' + this.state.livingArea });
        if (this.state.lotSize !== '')
            chips.push({ type: 'lot', label: 'Lot size: ' + this.state.lotSize });
        if (this.state.yearBuilt !== '')
            chips.push({ type: 'year', label: 'Year built: ' + this.state.yearBuilt });

        this.setState({ dialogOpen: false, chipData: chips });

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
            this.state.buildingQuality, this.state.story, this.state.livingArea, this.state.lotSize, this.state.yearBuilt, this.searchCount)
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
            chipData: []
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

    handleDeleteChip = data => async () => {
        var newConditions = this.props.searchConditions;

        if (data.type === 'zip') {
            newConditions.zip = '';
            await this.setState({ zip: '' });
        }
        else if (data.type === 'minPrice') {
            newConditions.minPrice = '';
            await this.setState({ minPrice: '' });
        }
        else if (data.type === 'maxPrice') {
            newConditions.maxPrice = '';
            await this.setState({ maxPrice: '' });
        }
        else if (data.type === 'bedroomCnt') {
            newConditions.bedroomCnt = '';
            await this.setState({ bedroomCnt: '' });
        }
        else if (data.type === 'bathroomCnt') {
            newConditions.bathroomCnt = '';
            await this.setState({ bathroomCnt: '' });
        }
        else if (data.type === 'story') {
            newConditions.story = '';
            await this.setState({ story: '' });
        }
        else if (data.type === 'quality') {
            newConditions.buildingQuality = '';
            await this.setState({ buildingQuality: '' });
        }
        else if (data.type === 'area') {
            newConditions.livingArea = '';
            await this.setState({ livingArea: '' });
        }
        else if (data.type === 'lot') {
            newConditions.lotSize = '';
            await this.setState({ lotSize: '' });
        }
        else if (data.type === 'year') {
            newConditions.yearBuilt = '';
            await this.setState({ yearBuilt: '' });
        }
        else
            throw new Error('Unexpected chip type.');

        this.props.searchConditionChanged(newConditions);

        const chipData = [...this.state.chipData];
        const chipToDelete = chipData.indexOf(data);
        chipData.splice(chipToDelete, 1);
        this.setState({ chipData });

        this.service.searchHouse(this.state.zip, this.state.minPrice, this.state.maxPrice, this.state.bedroomCnt, this.state.bathroomCnt,
            this.state.buildingQuality, this.state.story, this.state.livingArea, this.state.lotSize, this.state.yearBuilt, this.searchCount)
            .then((result) => this.props.searchHousesResultChanged(result));
    };

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
                                id='zip'
                                className={classes.textField}
                                label='Zip'
                                placeholder='Zip'
                                margin="dense"
                                value={this.state.zip}
                                onChange={event => this.setState({ zip: event.target.value })}
                            />
                            <FormControl className={classes.formControl}>
                                <InputLabel>Min Price</InputLabel>
                                <Select
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
                                    <MenuItem value={8}>8+</MenuItem>
                                    <MenuItem value={9}>9+</MenuItem>
                                    <MenuItem value={10}>10</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <InputLabel>Living Area</InputLabel>
                                <Select
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
                        {this.state.chipData.map((data, index) => 
                            <Chip
                                key={index}
                                label={data.label}
                                onDelete={this.handleDeleteChip(data)}
                                className={classes.chip}
                            />
                        )}
                    </Grid>
                </Grid>
                <Grid container spacing={8} alignItems='flex-start'>
                    <Grid item xs={8}>
                        <div style={{ height: '75vh' }}>
                            <Map />
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div style={{ height: '80vh' }}>
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
