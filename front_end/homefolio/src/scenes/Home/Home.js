import React, { Component } from 'react'; 
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
    login: {
        margin: 5,
        position: 'fixed',
        top: 10,
        right: 150
    },
    signup: {
        margin: 5,
        position: 'fixed',
        top: 10,
        right: 50
    },
    buy: {
        margin: 20,
        width: '30%',
        position: 'fixed',
        top: '30%',
        left: '15%'
    },
    sell: {
        margin: 20,
        width: '30%',
        position: 'fixed',
        top: '30%',
        right: '15%'
    }
};

class Home extends Component {
    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <RaisedButton label='Login' secondary={true} style={styles.login} />
                    <RaisedButton label='Signup' secondary={true} style={styles.signup} />
                    <RaisedButton label='Buy' primary={true} style={styles.buy} href='loginsignup' />
                    <RaisedButton label='Sell' primary={true} style={styles.sell} href='loginsignup' />
                </MuiThemeProvider>
            </div>
        )
    }
}

export default Home;