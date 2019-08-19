import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
//import image from './favicon.ico';
import image from '../header/logo-var.png';


const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1,
    },

    footerBackground: {
        padding: '40px 0 20px',
        lineHeight: '1.8',
      backgroundColor: "#3e3d3d",
      color: '#bababa',
      margin: 0,
        display:'flex'
    },

    footerIcon: {
      color: "#e8e8e8",
    },


    row:
    {
      display: "flex",
      flexDirection: "row",
      marginLeft: "50px",
      paddingTop: "50px",
    },
    subscr:{
        marginTop: '10px',
        fontSize: '13px',
        color: '#ff9800'}





}));

export default function Footer() {
    const classes = useStyles();

  return (
<div id="footer" className={ classes.footerBackground}>
  <div className="container clearfix">
      <div className="row">

                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12">
                <img style={{width: "100%",marginRight: "20px"}}src={image} alt="Varpet Logo"/>
                </div>
                <div className="col-lg-6 col-md-10 col-sm-10 col-xs-12">
                <p style={{marginTop:"15px"}}>
                  Copyright 2019 - HiVarpet.am Incorporated. All rights reserved.
                </p>

                </div>
                <div  className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                <form id="widget-subscribe-form" action="include/subscribe.php" role="form" method="post" className="nobottommargin" noValidate="novalidate">
                    <div className="input-group divcenter">

                        <input type="email" id="widget-subscribe-form-email" name="widget-subscribe-form-email" className="form-control required email" placeholder="Enter your Email" />
                            <div className="input-group-append">
                                <button className="btn btn-success" type="button">Subscribe</button>
                            </div>
                    </div>
                </form>
                    <h6 className={classes.subscr}><strong>Subscribe</strong> to Our Newsletter to get Important News</h6>
                </div>
            </div>
      </div>
</div>



  );

}
