import React, {useState,useEffect} from 'react';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {fire} from '../../firebase/fire';
import Header from "./header";
import SignInImage from "./SignInImage.svg"
import {Link} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  linkStyle: {
      fontSize: "18px!important",
      margin: "16px!important",
  },

  grow: {
      flex: 1,
      width: "100%",

  },

  row:
  {
      display: "flex",
      flexDirection: "row",
  }

  }));




export default function Logout(props) {
  const logoutBtnClick =()=>{
    fire.auth().signOut().then((user) =>{props.logout(false)
console.log(user);console.log('sign out')}).catch(function(error) {
    // Handle Errors here.
    //const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    props.logout(false)

    // ...
    });
  };


    const classes = useStyles();
    useEffect(()=>{},[props])
    return (


            <div className={classes.linkStyle}>
            <div className={classes.row}>
               <img style={{width: "26px", display: "block", marginRight: '5px'}} src={SignInImage} alt="Varpet Logo"/>
               <Link onClick={logoutBtnClick} title="Logout">Logout</Link>
            </div>
            </div>

          );
      }
