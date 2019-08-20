import React, {useState,useEffect} from 'react';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {fire} from '../../firebase/fire';
import Header from "./header";
import SignInImage from "./SignInImage.svg"
import {Link} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import LogoutImg from "./Logout.svg";



const useStyles = makeStyles(theme => ({
  linkStyle: {
      fontSize: "18px!important",
      margin: "8px!important",
      color: "white!important",
      textShadow: "0px 3px 5px #0e090096",
  },

  grow: {
      flex: 1,
      width: "100%",

  },

  row:
  {
      display: "flex",
      flexDirection: "row",
  },

  headerIcon:
  {
    width: "26px",
    display: "block",
    marginRight: '5px'
  },

  headerLink:
  {
    color: "white!important",
    textShadow: "0px 3px 5px #0e090096",
  }


  }));




export default function Logout(props) {
  const logoutBtnClick =()=>{
    fire.auth().signOut().then((user) =>{
        props.logout_user(user);
        console.log(user);
        console.log('sign out')}).catch(function(error) {
    // Handle Errors here.
    //const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);

    });
  };


    const classes = useStyles();
    useEffect(()=>{},[props])
    return (


            <div className={classes.linkStyle}>
            <div className={classes.row}>
               <img style={{width: "26px", display: "block", marginRight: '5px'}} src={LogoutImg} alt="Logout icon"/>
               <Link className={classes.linkStyle} to={'/'} onClick={logoutBtnClick} title="Logout">Logout</Link>
            </div>
            </div>

          );
      }
