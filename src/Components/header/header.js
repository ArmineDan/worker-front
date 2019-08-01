import React from 'react';
import {fade, makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import image from './logo-var.png';
import login from './login.js';
import register from './register.js';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";


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
        [theme.breakpoints.up('md')]: {
            width: 850,
        },
    },

    imgDiv: {
        width: "200px",
    },

    linkStyle: {
        fontSize: "18px!important",
        margin: "16px!important",
    }
}));

export default function PrimarySearchAppBar() {
    const classes = useStyles();


    return (
        <Router>
            <div className={classes.grow}>
                <AppBar position="static">
                    <Toolbar>
                        <div className={classes.imgDiv}>
                            <img style={{width: "100%", display: "block"}} src={image}/>
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
                        <div className={classes.linkStyle}>
                            <Link to="/Login">Login</Link>
                            <Route path="/Login/" component={login} />
                        </div>
                        <div className={classes.linkStyle}>
                            <Link to="/register">Register</Link>
                            <Route path="/register/" component={register}/>
                        </div>

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
        </Router>
    );
}
