import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


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
                      <Avatar alt="Varpet Avatar" src='https://images.pexels.com/photos/736716/pexels-photo-736716.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' className={classes.bigAvatar} />
                  </Grid>
                 </CardContent>
                    <CardContent>
                        <Typography className={classes.btBorder} gutterBottom variant="h5" component="h2">
                            My Profile
                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="p" >
                            <span className={classes.color}>name:</span> Karine Karapetyan
                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="p">
                            <span className={classes.color}>address:</span> Yerevan, Masiv, Gayi ave.
                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="p">
                            <span className={classes.color}>email:</span> karapetyan@gmail.com
                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="p">
                            <span className={classes.color}>mobile:</span> 095 10 10 15
                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="p">
                            <span className={classes.color}>age:</span> 28
                        </Typography>
                    </CardContent>
          </div>
    )
}

