import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Map from '../../scenes/Home/Map.component';
import TopList from '../../scenes/Home/TopList.component';
import NavBar from '../../components/NavBar/NavBar.component';
import { Link } from 'react-router-dom';
import { Typography } from 'material-ui';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    button: {
        margin: theme.spacing.unit,
    }
});

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bounds: null,
            selected: [],
            selectedCount: 0
        }
    }

    onBoundChanged = (newBound) => {
        this.setState({ bounds: newBound });
    }

    onAddToCompare = (h_id) => {
        var oldSelected = this.state.selected;
        oldSelected.push(h_id);
        this.setState({ selected: oldSelected });
        this.setState({ selectedCount: this.state.selected.length });
    }

    prepareCompareURL = () => {
        var url = '/compare?houses='
        for(var index in this.state.selected) {
            if(parseInt(index, 10) === 0)
                url += this.state.selected[index];
            else
                url += (',' + this.state.selected[index]);
        }
        return url;
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <NavBar />
                    </Grid>
                    <Grid item xs={8}>
                        <Button
                            variant='raised'
                            primary='true'
                            className={classes.button}
                            color='primary'
                            size='large'
                            component={Link}
                            to='/search' >
                            Search
                        </Button>
                        <Button
                            variant='raised'
                            primary='true'
                            className={classes.button}
                            color='primary'
                            size='large' >
                            SELL
                        </Button>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant='headline' color='inherit' >
                            {this.state.selectedCount} selected
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Button
                            variant='raised'
                            primary='true'
                            className={classes.button}
                            color='secondary'
                            size='large'
                            component={Link}
                            to={this.prepareCompareURL()} >
                            Compare
                        </Button>
                    </Grid>
                </Grid>
                <Grid container spacing={8} alignItems='flex-start'>
                    <Grid item xs={8}>
                        <div style={{ height: '75vh' }}>
                            <Map onBoundChanged={(newBounds) => this.onBoundChanged(newBounds)} onAddToCompare={(h_id) => this.onAddToCompare(h_id)} />
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div style={{ height: '75vh' }}>
                            <TopList bounds={this.state.bounds} onAddToCompare={(h_id) => this.onAddToCompare(h_id)} />
                        </div>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
