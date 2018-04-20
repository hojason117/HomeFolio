import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import HouseService from '../../services/house.service';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    }
});

const Public = (props) => {
    const { classes } = props;
    const service = new HouseService();
    const showTupleCount = () => {
        service.getTotalTupleCount()
            .then(result => alert('Total tuples: ' + result))
            .catch(err => alert('Something went wrong, please try again.'));
    }

    return (
        <div>
            <Button
                variant='raised'
                primary='true'
                className={classes.button}
                color='primary'
                size='large'
                href='login' >
                LOGIN
                </Button>
            <Button
                variant='raised'
                primary='true'
                className={classes.button}
                color='primary'
                size='large'
                href='signup' >
                SIGNUP
                </Button>
            <Button
                variant='raised'
                secondary='true'
                className={classes.button}
                color='secondary'
                size='small'
                onClick={showTupleCount} >
                Total Tuples
                </Button>
        </div>
    )
}

export default withStyles(styles)(Public);
