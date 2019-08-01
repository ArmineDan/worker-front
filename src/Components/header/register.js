import React  from 'react';
import {useState} from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import "../../styles/login-register.css"
import AccountCircle from '@material-ui/icons/AccountCircle';
import {myStyles,useStyles} from './iconbuttonstyle'
import {fire,db} from '../../fire'
import {ThemeProvider} from "@material-ui/styles";


 function Register() {
    const classes = useStyles();
    const [values, setValues] = useState({
        firstName: '',
        lastName:'',
        email: '',
        password: '',
       });
     const registerBtnClick = ()=>{
         fire.auth().createUserWithEmailAndPassword(values.email, values.password).then((cred) => {
             console.log("user create");
             console.log(cred);
             return db.collection('users').doc(cred.user.uid).set({
                 firstName:values.firstName,
                 lastName:values.lastName,
                 email:values.email,
                 })
         }).catch(function (error) {
             // Handle Errors here.
             var errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
             // ...
         });
       };
      const handleChange = (e)=> {
        setValues({ ...values, [e.target.name]: e.target.value });
        console.log(values)
    };

    return (
        <form className='loginDiv' noValidate autoComplete="on">
            <h4 style={myStyles.h4}>
                <AccountCircle className={classes.iconColor}/>  Register page
                <hr />
            </h4>
            <p className={classes.pStyle}>Please fill in this form to create an account </p>

            <TextField
                id="outlined-with-placeholder"
                label="firstName"
                placeholder="Your first name ..."
                className={classes.textField}
                margin="normal"
                variant="outlined"
                type='text'
                name='firstName'
                onChange={handleChange}
            />
            <TextField
                id="outlined-with-placeholder"
                label="lastName"
                placeholder="Your last name ..."
                className={classes.textField}
                margin="normal"
                variant="outlined"
                type='text'
                name='lastName'
                onChange={handleChange}
            />
            <TextField
                id="outlined-email-input"
                label="Email"
                className={classes.textField}
                type="email"
                name="email"
               /* autoComplete="email"*/
                margin="normal"
                variant="outlined"
                onChange={handleChange}
            />
            <TextField
                id="outlined-password-input"
                label="Password"
                className={classes.textField}
                type="password"
                name='password'
               /* autoComplete="current-password"*/
                margin="normal"
                variant="outlined"
                onChange={handleChange}
            />
             <Button variant="contained" color="primary" className={classes.butStyle}  onClick={registerBtnClick}> Register </Button>
        </form>
            )
        }
        export default Register;