import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
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


});

export default function HeaderSkillList() {
    const classes = useStyles();
    return (

            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Why should I add my skills in my skills List?
                </Typography>
                <Typography variant="body1" color="textSecondary" component="p" >
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Laudantium harum ea quo! Nulla fugiat earum, sed corporis amet iste non,
                    id facilis dolorum, suscipit, deleniti ea. Nobis, temporibus magnam doloribus.
                    Reprehenderit necessitatibus esse dolor tempora ea unde, itaque odit. Quos.
                </Typography>

            </CardContent>

    )
}

