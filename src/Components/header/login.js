import React from 'react';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { orange } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import "../../styles/login-register.css"
import {fire} from '../../fire'
const myStyles ={
    button: {
        margin: "10px auto",
        width: 'inherit',
    },
    icon:{
        width:100,
        height: 100,
        margin: 'auto',
        color:"black"
    },

};

const theme = createMuiTheme({
    palette: {
        primary: {main: orange[500]}, // Purple and green play nicely together.
        secondary: {main: '#11cb5f'}, // This is just green.A700 as hex.
    },
    overrides: {
        MuiButton: {
            root: {

                padding: "10px"
            }
        }
    }
});

class Login extends React.Component{
            constructor(props){
                super(props);
                this.state={
                    email:'',
                    password:''
                }
            }
            handleChange= (e) =>{
                this.setState({[e.target.name]: e.target.value});
            };
            loginBtnClick =()=>{
                fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
                    .then((u)=>{console.log(u);console.log('sign in')}).catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorMessage);
                    // ...
                });
            };
            render() {
             return(
                 <div className="loginDiv">
                  <AccountCircle style = {myStyles.icon}/>
                 <ThemeProvider theme={theme}>
                    <TextField color="red"
                        id="outlined-email-input"
                        label="Email"
                        type="email"
                        name="email"
                        autoComplete="email"
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleChange}
                    />
                     <TextField
                         id="outlined-password-input"
                         label="Password"
                         name ="password"
                         type="password"
                         autoComplete="current-password"
                         margin="normal"
                         variant="outlined"
                         onChange={this.handleChange}
                     />
                     <Button onClick={this.loginBtnClick} variant="contained" color="primary" >Log in</Button>
                     <h6 className="regLine"> Are you new Varpet ? </h6>
                     <Button variant="contained" color="primary"  >Register</Button>
                 </ThemeProvider>
                </div>
                )
            }

        }


export default Login;

