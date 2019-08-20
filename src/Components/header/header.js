import React, {useState,useEffect} from 'react';
import {fade, makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import image from './logo-var.png';
import SignInImage from "./SignInImage.svg"
import SignUpImage from "./SignUp.svg"
import {Link} from "react-router-dom";
import Logout from "./logout"

const useStyles = makeStyles(theme => ({
    grow: {
        flex: 1,
        width: "100%",

    },

    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },

        marginRight: theme.spacing(5),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(5),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },


    inputRoot: {
        color: 'inherit',
    },

    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        margin:'2px auto',
        [theme.breakpoints.up('md')]: {
          width:'38vw'
        },
        [theme.breakpoints.up('lg')]: {
            width:'850px',

        },
    },

    imgDiv: {
        width: "200px",
        minWidth: '120px',
        [theme.breakpoints.up('md')]: {
             width:'176px'
},
    },

    linkStyle: {
        fontSize: "18px!important",
        margin: "16px!important",
    },

    padding:{
        padding:12,
        display:'flex'
    },

    row:
    {
        display: "flex",
        flexDirection: "row",
    }

}));

export default function PrimarySearchAppBar(props) {
    const classes = useStyles();
    const  [is_user_logged_in,setLogInOut]=useState(props.user_status);


    const logout=(e)=>{
      console.log("click");
       setLogInOut(e);
       console.log("click");

   };
   useEffect(() => {
//       console.log(is_user_logged_in,"is_user_logged_in")
      //console.log(props.user_status,"props.user_status")

       setLogInOut(props.user_status)
            }, [is_user_logged_in,props.user_status]);
    return (

            <div className={classes.grow}>
                <AppBar position="static">
                    <Toolbar className={classes.padding}>
                        <div className={classes.imgDiv}>
                            <Link to="/" >
                            <img style={{width: "100%", display: "block"}} src={image} alt="Varpet Logo"/>
                            </Link>
                        </div>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon/>
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{'aria-label': 'search'}}
                            />
                        </div>


                        <div className={classes.grow}/>
                        {!is_user_logged_in?
                          <div>
                        <div className={classes.row}>
                        <div className={classes.linkStyle}>
                        <div className={classes.row}>
                           <img style={{width: "26px", display: "block", marginRight: '5px'}} src={SignInImage} alt="Varpet Logo"/>
                            <Link to="/Login" title="Login">Login</Link>
                        </div>
                          </div>

                        <span style={{color: '#d46402', paddingTop: '15px'}}>|</span>
                        <div className={classes.linkStyle}>
                          <div className={classes.row}>
                           <img style={{width: "26px", display: "block", marginRight: '5px'}} src={SignUpImage} alt="Varpet Logo"/>
                            <Link to="/register" title="Register">Register</Link>
                        </div>
                        </div>
                      </div>
                      </div> :
                            <>
                       <Link to={{
                       pathname: '/my-account',
                       state:{'userId':is_user_logged_in.uid}
                       }} title="My Account">My Account</Link>
                      <Logout  logout_user={logout}/>

                        </>
}

                        {/*    <div className={classes.sectionDesktop}>

            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>

          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
*/}
                    </Toolbar>
                </AppBar>
            </div>

    );
}
