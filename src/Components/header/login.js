import React from 'react';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { orange } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
//import AccountCircle from '@material-ui/icons/AccountCircle';
import "../../styles/login-register.css";
import {fire} from '../../firebase/fire';
import {myStyles} from './iconbuttonstyle';
import Header from "./header";
import workerImage from './worker.png'



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
                    password:'',
                    signIn: false,
                    userId:'',
                    linkName:'/login'
                }
            }
            handleChange = (e) =>{
                this.setState({[e.target.name]: e.target.value});
            };
            loginBtnClick =()=>{
                fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
                    .then((user)=>{
                        console.log(user.user.uid);
                        console.log('sign in');
                        this.setState({
                            userId : user.user.uid,
                            signIn : true,
                            linkName:'/my-account'
                        });
                        console.log(this.state.linkName);
                        this.props.history.push({
                            pathname: '/my-account',
                            state:{'userId':this.state.userId}
                        })
                    }).catch(function(error) {
                    // Handle Errors here.
                    //const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorMessage);
                    // ...
                });
            };
            regBtnClick = ()=>{
              //  console.log("nhjhk");
               this.props.history.push("/register")
                            };
            render() {
             return(
               <div>
                   <Header/>
                       < div className = "loginDiv" >
                       < img src ={workerImage} alt ="worker.png" style={myStyles.worker}/>
                   {/*<AccountCircle style = {myStyles.icon}/>*/}
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
                       <Button  className='logRegStile' onClick={this.loginBtnClick} variant="contained" color="primary" >Login</Button>
                       <h6 className="regLine"> Are you new Varpet ? </h6>
                       <Button variant="contained" color="primary"  onClick={this.regBtnClick} className='logRegStile'>Register</Button>
                       </ThemeProvider>
                       </div>
              </div>
                )
            }

        }


export default Login;

