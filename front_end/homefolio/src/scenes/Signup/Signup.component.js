import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import { FormLabel, FormControl, FormGroup, FormControlLabel } from 'material-ui/Form';
import Button from 'material-ui/Button';
import AppBar from 'material-ui/AppBar';
import Typography from 'material-ui/Typography';
import Toolbar from 'material-ui/Toolbar';
import AuthService from '../../services/auth.service';
import { Redirect } from 'react-router-dom';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    button: {
        margin: theme.spacing.unit,
    }
});

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.service = new AuthService();
        this.state = {
            redirectToPublic: false,
            email: '',
            username: '',
            password: '',
            age: '',
            area: '',
            bio: '',
            seller: false,
            buyer: false
        }
    }

    signup = () => {
        var temp;
        if(this.state.age === '')
            temp = 0;
        else
            temp = parseInt(this.state.age, 10);

        if(this.state.seller === false && this.state.buyer === false)
            alert('Please select at least one account type.');
        else
            this.service.signup(this.state.email, this.state.username, this.state.password, temp, this.state.area, this.state.bio, this.state.seller, this.state.buyer)
                .then(() => this.setState({ redirectToPublic: true }))
                .catch(err => alert(err.message));
    }

    render() {
        const { classes } = this.props;

        if (this.state.redirectToPublic)
            return <Redirect to={{ pathname: "/" }} />

        return (
            <div className={classes.root} onKeyDown={e => { if (e.keyCode === 13) this.signup(); }}>
                <AppBar position='static'>
                    <Toolbar>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            Signup
                        </Typography>
                    </Toolbar>
                </AppBar>
                <form className={classes.container}>
                    <TextField
                        required
                        autoFocus
                        id='signupEmailField'
                        className={classes.textField}
                        label='email'
                        placeholder='Email'
                        margin='normal'
                        onChange={event => this.setState({ email: event.target.value })}
                    />
                    <TextField
                        required
                        id='signupUsernameField'
                        className={classes.textField}
                        label='username'
                        placeholder='Username'
                        type='username'
                        margin='normal'
                        onChange={event => this.setState({ username: event.target.value })}
                    />
                    <TextField
                        required
                        id='signupPasswordField'
                        className={classes.textField}
                        label='password'
                        placeholder='Password'
                        type='password'
                        margin='normal'
                        onChange={event => this.setState({ password: event.target.value })}
                    />
                    <TextField
                        id='signupAgeField'
                        className={classes.textField}
                        label='age'
                        placeholder='Age'
                        type='age'
                        margin='normal'
                        onChange={event => this.setState({ age: event.target.value })}
                    />
                    <TextField
                        id='signupAreaField'
                        className={classes.textField}
                        label='area'
                        placeholder='Area'
                        type='area'
                        margin='normal'
                        onChange={event => this.setState({ area: event.target.value })}
                    />
                    <TextField
                        id='signupBioField'
                        className={classes.textField}
                        label='bio'
                        placeholder='Bio'
                        type='bio'
                        margin='normal'
                        onChange={event => this.setState({ bio: event.target.value })}
                    />
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Account type</FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.seller}
                                        onChange={(event) => this.setState({ seller: !this.state.seller })}
                                    />
                                }
                                label='Seller'
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.buyer}
                                        onChange={(event) => this.setState({ buyer: !this.state.buyer })}
                                    />
                                }
                                label='Buyer'
                            />
                        </FormGroup>
                    </FormControl>
                    <Button
                        variant='raised'
                        primary='true'
                        className={classes.button}
                        color='primary'
                        onClick={this.signup} >
                        signup
                    </Button>
                </form>
            </div>
        )
    }
}

Signup.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Signup);
