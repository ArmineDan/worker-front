import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import UploadAvatarImage from "../UploadAvatarImage";


const useStyles = makeStyles({
     col:{
        //width:'10px',
         float:'left'
    },

    bigAvatar: {
        width: '100px',
        height: '100px',
        margin: '10px',
        border: '5px solid #ffa500'
    },
    btBorder: {
        borderBottom: 'thin solid #ffa500'
    },
    color: {
        color :'#ffa500',

    },


});

export default function UserInfo(props) {
    const classes = useStyles();
    return (
          <div className="row clearfix edit">
              <CardContent className={classes.col}  >
                  <Grid container justify="center" alignItems="center">
                      <UploadAvatarImage userId = {props.data.id} avatar ={props.data.avatar} editable ={false}/>
                  </Grid>
                 </CardContent>
                    <CardContent>
                        <Typography className={classes.btBorder} gutterBottom variant="h5" component="h2">
                            My Profile
                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="p" >
                            <span className={classes.color}>name:</span> {props.data.firstName} &nbsp; {props.data.lastName}
                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="p">
                            <span className={classes.color}>address:</span> {props.data.address}
                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="p">
                            <span className={classes.color}>email:</span> {props.data.email}
                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="p">
                            <span className={classes.color}>mobile:</span> {props.data.mobile}
                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="p">
                            <span className={classes.color}>age:</span> {props.data.age}
                        </Typography>
                    </CardContent>
          </div>
    )
}

