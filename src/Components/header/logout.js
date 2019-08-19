import React, {useEffect} from 'react';
import {fire} from '../../firebase/fire';
import SignInImage from "./SignInImage.svg"
import {Link} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';


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
               <img style={{width: "26px", display: "block", marginRight: '5px'}} src={SignInImage} alt="Varpet Logo"/>
               <Link to={'/'} onClick={logoutBtnClick} title="Logout">Logout</Link>
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