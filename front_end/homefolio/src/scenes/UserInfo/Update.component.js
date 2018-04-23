import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';
import { FormControl } from 'material-ui/Form';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import UserService from '../../services/user.service';
import { userUpdateDialogToggled } from '../../redux/actions/main';
import Snackbar from 'material-ui/Snackbar';
import { InputLabel } from 'material-ui/Input';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 130,
    },
    selects: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 150,
    },
    button: {
        margin: theme.spacing.unit,
    },
    root: {
        flexGrow: 10,
    },
    flex: {
        flex: 1,
    }
});

const mapStateToProps = state => {
    return { userUpdateDialogOpen: state.userUpdateDialogOpen };
}

const mapDispatchToProps = dispatch => {
    return { userUpdateDialogToggled: newBound => dispatch(userUpdateDialogToggled()) };
};

class Update extends React.Component {
    constructor(props) {
        super(props);
        this.service = new UserService();
        this.state = {
            username: '',
            password: '',
            age: 0,
            area: '',
            bio: '',
            dialogOpen: props.userUpdateDialogOpen,
            snackbarOpen: false
        }
        this.ageValue = [];
        for (var i = 18; i <= 65; i++)
            this.ageValue.push(i);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ dialogOpen: nextProps.userUpdateDialogOpen });
    }
    
    handleSubmit = async () => {
        if (this.state.username !== '' && this.state.password !== '' && this.state.age !== 0 && this.state.area !== '' && this.state.bio !== '') {
            this.props.userUpdateDialogToggled();

            this.service.updateUserInfo(this.state.username, this.state.password, this.state.age, this.state.area, this.state.bio)
                .then(() => this.setState({ snackbarOpen: true }));

            this.handleReset();
        }
        else
            alert('All fields are required!');
    }

    handleReset = () => {
        this.setState({
            username: '',
            password: '',
            age: 0,
            area: '',
            bio: '',
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={this.state.snackbarOpen}
                    onClose={() => this.setState({ snackbarOpen: false })}
                    autoHideDuration={5000}
                    SnackbarContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Your profile is updated!!</span>}
                />
                <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    open={this.state.dialogOpen}
                    onClose={this.handleClose}
                >
                    <DialogTitle>Please input your house's information</DialogTitle>
                    <DialogContent>
                        <form className={classes.container}>
                            <TextField
                                required
                                id='username'
                                className={classes.textField}
                                label='Username'
                                placeholder = 'Username'
                                value={this.state.username}
                                margin="dense"
                                onChange={event => this.setState({ username: event.target.value })}
                            />
                            <TextField
                                required
                                id='password'
                                className={classes.textField}
                                label='Password'
                                placeholder='Password'
                                type='password'
                                value={this.state.password}
                                margin="dense"
                                onChange={event => this.setState({ password: event.target.value })}
                            />
                            <FormControl className={classes.formControl}>
                                <InputLabel>Age</InputLabel>
                                <Select
                                    id='age'
                                    label='age'
                                    value={this.state.age}
                                    className={classes.selects}
                                    name="age"
                                    onChange={event => { this.setState({ [event.target.name]: event.target.value }) }}
                                >
                                    {this.ageValue.map((age, index) => <MenuItem key={index} value={age}>{age}</MenuItem>)}
                                </Select>
                            </FormControl>
                            <TextField
                                required
                                id='area'
                                className={classes.textField}
                                label='Area'
                                placeholder='Area'
                                value={this.state.area}
                                margin="dense"
                                onChange={event => this.setState({ area: event.target.value })}
                            />
                            <TextField
                                required
                                id='bio'
                                className={classes.textField}
                                label='Bio'
                                placeholder='Bio'
                                value={this.state.bio}
                                margin="dense"
                                onChange={event => this.setState({ bio: event.target.value })}
                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.props.userUpdateDialogToggled()} color="primary">
                            Cancel
                        </Button>
                        <Button
                            variant='raised'
                            primary='true'
                            className={classes.button}
                            color='secondary'
                            onClick={this.handleReset} >
                            Reset
                        </Button>
                        <Button
                            variant='raised'
                            primary='true'
                            className={classes.button}
                            color='primary'
                            onClick={this.handleSubmit} >
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

Update.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)((withStyles(styles)(Update)));
