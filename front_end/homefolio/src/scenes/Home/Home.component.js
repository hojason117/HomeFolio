import React from 'react';
import { connect } from "react-redux";
import { sellDialogToggled } from '../../redux/actions/main';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Map from './Map.component';
import TopList from './TopList.component';
import NavBar from '../../components/NavBar/NavBar.component';
import Sell from './Sell.component';
import { Link } from 'react-router-dom';
import { Typography } from 'material-ui';
import indigo from 'material-ui/colors/indigo';

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: indigo[50],
    },
    button: {
        margin: theme.spacing.unit,
    },
});

const mapStateToProps = state => {
    return { 
        selectedCount: state.compareHousesCount,
        sellDialogOpen: state.sellDialogOpen
    };
}

const mapDispatchToProps = dispatch => {
    return { sellDialogToggled: newBound => dispatch(sellDialogToggled()) };
};

const Home = (props) => {
    const { classes } = props;

    const verifyCompare = () => {
        if (props.selectedCount < 2 )
            alert('Please select at least two houses.');
        else
            props.history.push('compare');
    }

    return (
        <div className={classes.root}>
            <Sell />
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
                    {localStorage.getItem('seller') === 'yes' && <Button
                        variant='raised'
                        primary='true'
                        className={classes.button}
                        color='primary'
                        size='large'
                        onClick={() => props.sellDialogToggled()} >
                        SELL
                    </Button>}
                </Grid>
                <Grid item xs={2}>
                    <Typography variant='headline' color='inherit' >
                        {props.selectedCount} selected
                    </Typography>
                </Grid>
                <Grid item xs={1}>
                    <Button
                        variant='raised'
                        primary='true'
                        className={classes.button}
                        color='secondary'
                        size='large'
                        onClick={verifyCompare} >
                        Compare
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
                        <TopList />
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home));
