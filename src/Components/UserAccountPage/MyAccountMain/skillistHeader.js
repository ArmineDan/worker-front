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
                  Why should I add my skills?
                </Typography>
                <Typography variant="body1" color="textSecondary" component="p" >
                    Adding skills will help you boost your profile and appear in
                    search results. Add all the skills that you are confident about.
                    Please don't overload adding skills to have satisfied clients.
                    And also, please, add your mobile number, age and address.

                </Typography>

            </CardContent>

    )
}

