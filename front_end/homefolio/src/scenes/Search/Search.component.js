import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';
import HouseService from '../../services/house.service';
import NavBar from '../../components/NavBar/NavBar.component';

const styles = theme => ({
    container: {
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 105,
    },
    address: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    SelectPrice: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 105,
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

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.service = new HouseService();
        this.state = {
            zip: '',
            lowwerPrice: '',
            higherPrice: '',
            bedroomCnt: '',
            bathroomCnt: '',
            buildingQuality: '',
            livingAreaSize: '',
            story: '',
            lotSize: '',
            yearBuilt: '',
        }
    }

    search = () =>  {
        this.service.serarch(this.state.zip, this.state.lowwerPrice, this.state.lowwerPrice, this.state.higherPrice, this.state.bedroomCnt, this.state.bathroomCnt, 
            this.state.buildingQuality, this.state.livingAreaSize, this.state.story, this.state.lotSize, this.state.yearBuilt);
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root} onKeyDown={e => {if(e.keyCode === 13) this.search();}}>
                <NavBar />
                <form className={classes.container}>
                    <TextField
                        required
                        id='searchZipField'
                        className={classes.textField}
                        label='Zip'
                        placeholder='Zip'
                        onChange={event => this.setState({address: event.target.value})}
                    />
                    <Select
                        required
                        id='seachLowwerPrice'
                        label='Lower Price'
                        value={this.state.lowwerPrice}
                        displayEmpty
                        className={classes.SelectPrice}
                        name="lowwerPrice"
                        onChange={event => {this.setState({ [event.target.name]: event.target.value })}}
                    >
                    <MenuItem value="">
                    <em>Min Price</em>
                        </MenuItem>
                        <MenuItem value={0}>0</MenuItem>
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
                    <Select
                        required
                        id='seachHigherPrice'
                        label='Higher Price'
                        value={this.state.higherPrice}
                        displayEmpty
                        className={classes.SelectPrice}
                        name="higherPrice"
                        onChange={event => {this.setState({ [event.target.name]: event.target.value })}}
                    >
                    <MenuItem value="">
                    <em>Max Price</em>
                        </MenuItem>
                        <MenuItem value={100000}>$100,000+</MenuItem>
                        <MenuItem value={200000}>$200,000+</MenuItem>
                        <MenuItem value={300000}>$300,000+</MenuItem>
                        <MenuItem value={400000}>$400,000+</MenuItem>
                        <MenuItem value={500000}>$500,000+</MenuItem>
                        <MenuItem value={600000}>$600,000+</MenuItem>
                        <MenuItem value={700000}>$700,000+</MenuItem>
                        <MenuItem value={800000}>$800,000+</MenuItem>
                        <MenuItem value={900000}>$900,000+</MenuItem>
                        <MenuItem value={10000000}>Any Price</MenuItem>
                    </Select>
                    <Select
                        required
                        id='bedroomCnt'
                        label='bedroomCnt'
                        value={this.state.bedroomCnt}
                        displayEmpty
                        className={classes.SelectPrice}
                        name="bedroomCnt"
                        onChange={event => {this.setState({ [event.target.name]: event.target.value })}}
                    >
                    <MenuItem value="">
                    <em>Beds</em>
                        </MenuItem>
                        <MenuItem value={0}>0+</MenuItem>
                        <MenuItem value={1}>1+</MenuItem>
                        <MenuItem value={2}>2+</MenuItem>
                        <MenuItem value={3}>3+</MenuItem>
                        <MenuItem value={4}>4+</MenuItem>
                        <MenuItem value={5}>5+</MenuItem>
                        <MenuItem value={6}>6+</MenuItem>
                    </Select>
                    <Select
                        required
                        id='bathroomCnt'
                        label='bathroomCnt'
                        value={this.state.bathroomCnt}
                        displayEmpty
                        className={classes.SelectPrice}
                        name="bathroomCnt"
                        onChange={event => {this.setState({ [event.target.name]: event.target.value })}}
                    >
                    <MenuItem value="">
                    <em>Baths</em>
                        </MenuItem>
                        <MenuItem value={0}>0+</MenuItem>
                        <MenuItem value={1}>1+</MenuItem>
                        <MenuItem value={1.5}>1.5+</MenuItem>
                        <MenuItem value={2}>2+</MenuItem>
                        <MenuItem value={3}>3+</MenuItem>
                        <MenuItem value={4}>4+</MenuItem>
                        <MenuItem value={5}>5+</MenuItem>
                        <MenuItem value={6}>6+</MenuItem>
                    </Select>
                    <Select
                        required
                        id='buildingQuality'
                        label='buildingQuality'
                        value={this.state.buildingQuality}
                        displayEmpty
                        className={classes.SelectPrice}
                        name="buildingQuality"
                        onChange={event => {this.setState({ [event.target.name]: event.target.value })}}
                    >
                    <MenuItem value="">
                    <em>House Quality</em>
                        </MenuItem>
                        <MenuItem value={0}>0+</MenuItem>
                        <MenuItem value={1}>1+</MenuItem>
                        <MenuItem value={2}>2+</MenuItem>
                        <MenuItem value={3}>3+</MenuItem>
                        <MenuItem value={4}>4+</MenuItem>
                        <MenuItem value={5}>5+</MenuItem>
                        <MenuItem value={6}>6+</MenuItem>
                        <MenuItem value={7}>7+</MenuItem>
                        <MenuItem value={8}>8+</MenuItem>
                        <MenuItem value={9}>9+</MenuItem>
                    </Select>
                    <Select
                        required
                        id='livingAreaSize'
                        label='livingAreaSize'
                        value={this.state.livingAreaSize}
                        displayEmpty
                        className={classes.SelectPrice}
                        name="livingAreaSize"
                        onChange={event => {this.setState({ [event.target.name]: event.target.value })}}
                    >
                    <MenuItem value="">
                    <em>Living Area</em>
                        </MenuItem>
                        <MenuItem value={0}>Any</MenuItem>
                        <MenuItem value={500}>500+ sqft</MenuItem>
                        <MenuItem value={1000}>1,000+ sqft</MenuItem>
                        <MenuItem value={1500}>1,500+ sqft</MenuItem>
                        <MenuItem value={2000}>2,000+ sqft</MenuItem>
                        <MenuItem value={2500}>2,500+ sqft</MenuItem>
                        <MenuItem value={3000}>3,000+ sqft</MenuItem>
                    </Select>
                    <Select
                        required
                        id='lotSize'
                        label='lotSize'
                        value={this.state.lotSize}
                        displayEmpty
                        className={classes.SelectPrice}
                        name="lotSize"
                        onChange={event => {this.setState({ [event.target.name]: event.target.value })}}
                    >
                    <MenuItem value="">
                    <em>Lot Size</em>
                        </MenuItem>
                        <MenuItem value={0}>Any</MenuItem>
                        <MenuItem value={1000}>1,000+ sqft</MenuItem>
                        <MenuItem value={3000}>3,000+ sqft</MenuItem>
                        <MenuItem value={5000}>5,000+ sqft</MenuItem>
                        <MenuItem value={7000}>7,000+ sqft</MenuItem>
                        <MenuItem value={9000}>9,000+ sqft</MenuItem>
                        <MenuItem value={11000}>11,000+ sqft</MenuItem>
                    </Select>
                    <Select
                        required
                        id='yearBuilt'
                        label='yearBuilt'
                        value={this.state.yearBuilt}
                        displayEmpty
                        className={classes.SelectPrice}
                        name="yearBuilt"
                        onChange={event => {this.setState({ [event.target.name]: event.target.value })}}
                    >
                    <MenuItem value="">
                    <em>Year Built</em>
                        </MenuItem>
                        <MenuItem value={1800}>Any</MenuItem>
                        <MenuItem value={1940}>1940+</MenuItem>
                        <MenuItem value={1950}>1950+</MenuItem>
                        <MenuItem value={1960}>1960+</MenuItem>
                        <MenuItem value={1970}>1970+</MenuItem>
                        <MenuItem value={1980}>1980+</MenuItem>
                        <MenuItem value={1990}>1990+</MenuItem>
                        <MenuItem value={1990}>1990+</MenuItem>
                        <MenuItem value={2000}>2000+</MenuItem>
                    </Select>
                    <Button
                        variant='raised'
                        primary='true'
                        className={classes.button}
                        color='primary'
                        onClick={this.search} >
                        apply
                    </Button>
                </form>
            </div>
        )
    }
}

Search.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Search);
