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
        padding: 0
    },
    color: {
        color :'#ffa500',

    },


});

export default function MySkills(props) {
    const classes = useStyles();
    const [skills,setSkills]=useState([]);
        useEffect(()=>{
            setSkills(props.skills)
        },[props,skills]);

    const delete_skill=(e)=>{

        //console.log(e.target.id,"delete_skills")
      props.delete(e.target.id,e.target.parentNode.getAttribute('data-id'),e.target.id)
    };
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
                    {skills.length?
                        skills.map((item,index)=>{
                            return(
                                <li key={index} data-id={index} className="select2-selection__choice" title={item.name} data-select2-id="36">
                                    <span id={item.id} className="select2-selection__choice__remove" role="presentation" onClick={delete_skill}>×</span>{item.name}</li>
                            )
                        }):<span className={classes.color}>No skills to display</span>
                    }
                </ul>
            </span>
        </div>
        </>
    )
}

