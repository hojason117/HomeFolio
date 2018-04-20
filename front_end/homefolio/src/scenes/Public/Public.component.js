import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import HouseService from '../../services/house.service';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    }
});

class Public extends React.Component {
    constructor(props) {
        super(props);
        this.service = new HouseService();
    }

    showTupleCount = () => {
        this.service.getTotalTupleCount().then((result) => { alert('Total tuples: ' + result) });
    }

    render() {
        const { classes } = this.props;

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
                    onClick={this.showTupleCount} >
                    Total Tuples
                </Button>
            </div>
        )
    }
}

export default withStyles(styles)(Public);
