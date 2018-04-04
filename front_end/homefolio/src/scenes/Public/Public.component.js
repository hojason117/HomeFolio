import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    }
});

class Public extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <div>
                <Button
                    variant='raised'
                    secondary='true'
                    className={classes.button}
                    color='secondary'
                    href='login' >
                    LOGIN
                </Button>
                <Button
                    variant='raised'
                    secondary='true'
                    className={classes.button}
                    color='secondary'
                    href='signup' >
                    SIGNUP
                </Button>
            </div>
        )
    }
}

export default withStyles(styles)(Public);
