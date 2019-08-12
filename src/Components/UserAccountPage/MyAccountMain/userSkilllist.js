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
        padding: 0
    },
    color: {
        color :'#ffa500',

    },


});

export default function MySkills() {
    const classes = useStyles();
    return (
        <>
        <CardContent className={classes.btBorder} >
            <Typography gutterBottom variant="h5" component="h2">
                My Skills
             </Typography>
         </CardContent>
        <div className="row clearfix edit-sk">
            <span>
                <ul className="select2-selection__rendered">
                    <li className="select2-selection__choice" title="orange" data-select2-id="36">
                        <span className="select2-selection__choice__remove" role="presentation">×</span>Dismantling</li>
                    <li className="select2-selection__choice" title="purple" data-select2-id="37">
                        <span className="select2-selection__choice__remove" role="presentation">×</span>Apartment</li>
                </ul>
            </span>
        </div>
        </>
    )
}

