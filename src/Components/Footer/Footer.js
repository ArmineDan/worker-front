import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import image from './favicon.ico';



const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1,
    },

    footerBackground: {
      backgroundColor: "#000",
      color: '#bababa',
      margin: 0,
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
    }


}));

export default function Footer() {
    const classes = useStyles();

  return (
  <div className={classes.grow}>
      <div className={classes.footerBackground}>
            <div className={classes.row}>
                <img style={{width: "40px", height: "40px", marginRight: "20px"}}src={image} alt="Varpet Logo"/>
                <p style={{marginTop:"15px"}}>
                  Copyright 2019 - Varpet.com Incorporated. All rights reserved.
                </p>
            </div>
      </div>
  </div>


  );

}
