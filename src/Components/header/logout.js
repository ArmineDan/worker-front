import React, {useEffect} from 'react';
import {fire} from '../../firebase/fire';
import SignInImage from "./SignInImage.svg"
import {Link} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import LogoutImg from "./Logout.svg";
import {connect} from 'react-redux';



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



 function Logout(props) {
  const logoutBtnClick =()=>{

    fire.auth().signOut().then((user) =>{
        props.set_user_status(false)
        //console.log(user);
        //console.log('sign out')
    }).catch(function(error) {
   // const errorMessage = error.message;
    //console.log(errorMessage);

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


const store = store => ({

});

const dispatch = dispatch => ({
    set_user_status:list => dispatch({type:'SET_USER_STATUS', payload:list}),
});

export default connect(
    store,
    dispatch
)(Logout)