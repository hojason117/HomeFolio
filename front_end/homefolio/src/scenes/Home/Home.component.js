import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import DataService from '../../services/data.service';
import Map from '../../scenes/Home/Map.component';
import TopList from '../../scenes/Home/TopList.component';
import NavBar from '../../components/NavBar/NavBar.component';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    }
});

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.service = new DataService();
    }

    render() {
        const { classes } = this.props;

        return (
            <div style={{ height: '100vh' }}>
                <div style={{ height: '17vh' }}>
                    <NavBar />
                    <Button
                        variant='raised'
                        primary='true'
                        className={classes.button}
                        color='primary' >
                        BUY
                    </Button>
                    <Button
                        variant='raised'
                        primary='true'
                        className={classes.button}
                        color='primary' >
                        SELL
                    </Button>
                </div>
                <div style={{ height: '80vh' }}>
                    <Map />
                    <TopList />
                </div>
            </div>
        )
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
