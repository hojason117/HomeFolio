import React from 'react';
import { connect } from "react-redux";
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

const mapStateToProps = state => {
    return { selectedCount: state.compareHousesCount };
}

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
                        component={Link}
                        to='/sell' >
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

export default connect(mapStateToProps)(withStyles(styles)(Home));
