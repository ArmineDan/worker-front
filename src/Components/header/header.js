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
import Logout from "./logout";
import {connect} from 'react-redux';
import AccountImg from "./Account.svg"
import Button from '@material-ui/core/Button';


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

        marginRight: 0,
        marginLeft: 0,
        marginTop: 15,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: 0,
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
            width:'600px',

        },
    },

    imgDiv: {
        width: "200px",
        minWidth: '120px',
        [theme.breakpoints.up('md')]: {
             width:'200px'
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
  },

  button:
{
    margin: theme.spacing(1),
    color: "white!important",
    fontSize: "13px",


 },

}));

function PrimarySearchAppBar(props) {
    const classes = useStyles();
    const [show_info,setShow_info]= useState();
    useEffect(() => {
        setShow_info(props.show_info)
            }, [props.user_status,props.show_info]);

    const set_info_show=()=>{
        if(show_info)props.set_show_info(false)
    };
 // const opemHotItWorks=()=>{
 //     if(props.data === 'App'){
 //         props.set_show_info(true)
 //         props.close_users_section()
 //     }
 //     else if(props.data === 'account'){
 //         props.goHome(true)
 //
 //     }
 //    };

    return (


                <AppBar position="static">
                    <Toolbar className={classes.padding}>
                      <div className="container-fluid clearfix">
                        <div className="row">

                        <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12">

                        <div className={classes.imgDiv}>
                            <Link to="/" >
                            <img style={{width: "100%", display: "block"}} src={image} alt="Varpet Logo" onClick={set_info_show}/>
                            </Link>
                        </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
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
                      </div>
                      <div  className="col-lg-1 col-md-12 col-sm-12 col-xs-12">
                          <Link to="/guide" >
                        <Button variant="outlined" className={classes.button}>
                           How It Works
                        </Button>
                          </Link>
                      </div>

                      <div  className="col-lg-3 col-md-12 col-sm-12 col-xs-12">

                        <div className={classes.grow}/>
                        {!props.is_login?
                          <div>
                        <div className={classes.row}>
                        <div className={classes.linkStyle}>
                        <div className={classes.row}>
                           <img className={classes.headerIcon} src={SignInImage} alt="Login Icon"/>
                        <Link className={classes.headerLink} to="/Login" title="Login">Login</Link>
                        </div>
                          </div>

                        <span style={{color: '#d46402', paddingTop: '15px'}}>|</span>
                        <div className={classes.linkStyle}>
                          <div className={classes.row}>
                           <img className={classes.headerIcon} src={SignUpImage} alt="Register Icon"/>
                            <Link className={classes.headerLink} to="/register" title="Register">Register</Link>
                        </div>
                        </div>
                      </div>
                      </div> :
                            <>

                      <div className={classes.linkStyle}>
                          <div className={classes.row}>
                             <img style={{height: "23px"}} className={classes.headerIcon} src={AccountImg} alt="My Account Icon"/>
                             <Link className={classes.headerLink} to={{
                             pathname: '/my-account',
                             state:{'userId':props.is_login.uid}
                             }} title="My Account">My Account</Link>
                          </div>
                        </div>
                        <span style={{color: '#d46402'}}>|</span>

                      <Logout/>


                        </>
}
                          </div>
                        </div>
                      </div>
                    </Toolbar>
                </AppBar>


    );
}

const store = store => ({
    is_login: store.user_status,
   show_info:store.showInfo
});

const dispatch = dispatch => ({
    set_user_status:list => dispatch({type:'SET_USER_STATUS', payload:list}),
    set_show_info:list => dispatch({type:'SHOW_HOW_IT_WORKS', payload:list}),
});

export default connect(
    store,
    dispatch
)(PrimarySearchAppBar)
