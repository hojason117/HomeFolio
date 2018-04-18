import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Map from '../../scenes/Home/Map.component';
import TopList from '../../scenes/Home/TopList.component';
import NavBar from '../../components/NavBar/NavBar.component';
import { Link } from 'react-router-dom';

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
            bounds: null
        }
    }

    onBoundChanged = (newBound) => {
        this.setState({ bounds: newBound });
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
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
                            component={Link}
                            to='/search' >
                            Search
                        </Button>
                        <Button
                            variant='raised'
                            primary='true'
                            className={classes.button}
                            color='primary' >
                            SELL
                        </Button>
                    </Grid>
                </Grid>
                <Grid container spacing={8} alignItems='flex-start'>
                    <Grid item xs={8}>
                        <div style={{ height: '80vh' }}>
                            <Map onBoundChanged={(newBounds) => this.onBoundChanged(newBounds)}/>
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div style={{ height: '80vh' }}>
                            <TopList bounds={this.state.bounds} />
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
