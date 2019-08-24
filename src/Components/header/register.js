import React, {useEffect} from 'react';
import {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import "../../styles/login-register.css";
import AccountCircle from '@material-ui/icons/AccountCircle';
import {myStyles,useStyles} from './iconbuttonstyle';
import {fire} from '../../firebase/fire';
import {setNewUser} from '../../firebase/fireManager';
import Header from "./header";
import {connect} from "react-redux";

 function Register(props) {
    const classes = useStyles();
    const [values, setValues] = useState({});
    const [errMessage, setErrMessage] = useState();
    const [showError, setShowError]=useState(false);
     const[userId, setUserId]=useState();
     const[linkName,setLinkName]=useState();
     const uuidv1 = require('uuid/v1');

     useEffect(() => {
     }, [linkName,userId,errMessage]);
    const  handleKeyPress=(e)=>{
         if (e.which == 13) {
             registerBtnClick();
             //console.log(e,'keyyy')
         }
     };

     const registerBtnClick = ()=>{

         const reg = /\d/g;
         const f = reg.test(values.firstName);
         const r = reg.test(values.lastName);
         if( values.firstName === '' || values.lastName === '' || values.firstName === undefined || values.lastName === undefined) {
             setErrMessage('Empty First Name or Last Name');
             setShowError(true);
         } else if(values.firstName.length < 3 || f || r || values.lastName.length < 3){
             /*const reg = /\d/g;
             const f = reg.test(values.firstName);*/
                 setErrMessage('First Name and Lat Name should be more than 3 characters \n and mustn\'t contain numbers');
                 setShowError(true);
             } else if( values.password === undefined || values.email === undefined || values.password === '' || values.email === '') {
                 setErrMessage('Invalid email or password');
                setShowError(true);
             }else{
            let name_first_letter = values.firstName[0].toUpperCase();
            let surname_first_letter = values.lastName[0].toUpperCase();
            let name_peace = values.firstName.slice(1);
            let surname_peace = values.lastName.slice(1);
            let firstName = name_first_letter + name_peace;
            let lastName= surname_first_letter + surname_peace;
            console.log(name_first_letter,surname_first_letter,name_peace,surname_peace);
           values.firstName = firstName;
           values.lastName=lastName;
           values.uuid=uuidv1();
            console.log(values,'vvvvvvaaaaaaaaalllllll');
            //debugger;

                 fire.auth().createUserWithEmailAndPassword(values.email, values.password).then((cred) => {
                     setNewUser(cred.user.uid,values).then(data => {
                         if (data){
                             fire.auth().signInWithEmailAndPassword(values.email, values.password)
                                 .then((user)=>{

                                     props.history.push(
                                     {       pathname: '/my-account',
                                             state:{'userId':cred.user.uid}
                                     }
                                     )
                                     // console.log(this.state.linkName);
                                 }).catch(error => {
                                  });


                     setShowError(false);
                 }})}).catch(function (error) {
                     // Handle Errors here."
                     //const errorCode = error.code;
                     setErrMessage(error.message);
                     setShowError(true);
                     //console.log(error.message);
                 });
             }
         };
      const handleChange = (e)=> {
        setValues({ ...values, [e.target.name]: e.target.value });
        //console.log(values);
    };

    return (
      <div>
        <Header/>
        <form className='loginDiv' noValidate autoComplete="on">
            <h4 style={myStyles.h4}>
                <AccountCircle className={classes.iconColor}/>  Register page
                <hr />
            </h4>
            <p className={classes.pStyle}>Please fill in this form to create an account </p>

            <TextField
                id="outlined-with-placeholder"
                label="First Name"
                placeholder="Your first name ..."
                className={classes.textField}
                margin="normal"
                variant="outlined"
                type='text'
                name='firstName'
                onKeyPress ={handleKeyPress}
                onChange={handleChange}
            />
            <TextField
                id="outlined-with-placeholder"
                label="Last Name"
                placeholder="Your last name ..."
                className={classes.textField}
                margin="normal"
                variant="outlined"
                type='text'
                name='lastName'
                onKeyPress ={handleKeyPress}
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
                onKeyPress ={handleKeyPress}
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
                onKeyPress ={handleKeyPress}
                onChange={handleChange}
            />
            {showError ? <p style={{color:'red', fontSize:'12px', marginBottom:'8px',textAlign:'left', marginLeft:'13px'}}> {errMessage}</p>: null}
             <Button variant="contained" color="primary" className={classes.butStyle}  onClick={registerBtnClick}>
                Register
             </Button>
        </form>
      </div>
            )
        }
const store = store => ({

});

const dispatch = dispatch => ({
    set_user_status:list => dispatch({type:'SET_USER_STATUS', payload:list}),
});

export default connect(
    store,
    dispatch
)(Register)
        //export default Register;
