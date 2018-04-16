import React from 'react';
import { withStyles } from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import AppBar from 'material-ui/AppBar';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    button: {
        margin: theme.spacing.unit,
    }
});

class NavBar extends React.Component {
    SignoutButton = withRouter(
        ({ history }) =>
            <Button
                variant='raised'
                secondary='true'
                className={this.props.button}
                color='default'
                onClick={() => {
                    history.push("/");
                    localStorage.removeItem('u_id');
                    localStorage.removeItem('auth_token');
                    localStorage.removeItem('username');
                    localStorage.removeItem('authenticated');
                    localStorage.removeItem('seller');
                    localStorage.removeItem('buyer');
                }} >
                Sign out
             </Button>
    )

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <div className={classes.flex}>
                            <Button component={Link} to="/home" >
                                <Typography variant="title" color="inherit" className={classes.flex} >
                                    HomeFolio
                                </Typography>
                            </Button>
                        </div>
                        <this.SignoutButton />
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);
