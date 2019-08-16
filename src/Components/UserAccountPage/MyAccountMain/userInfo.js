import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import UploadAvatarImage from "../UploadAvatarImage";
import {editUserInfo} from  '../../../firebase/fireManager';


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
    width:{
        width:'69%'
    }


});

export default function UserInfo(props) {
    const classes = useStyles();
    const [editOn,setEdit]= useState(false);
    const [firstName,setFirstName]= useState();
    const [lastName,setLastName]= useState();
    const [address,setAddress]= useState();
    const [email,setEmail]= useState();
    const [mobile,setMobile]= useState();
    const [age,setAge]= useState();
    const [obj,setObj]= useState({});


    useEffect(()=>{

        console.log(firstName,"fullNamefullName")
    },[editOn,firstName,address,email,mobile,age,obj])
    const edit=(e)=>{
        e.target.classList.add('on')
        const el=document.getElementById('no');
        const focusOn=document.querySelectorAll('input')[0];
        el.classList.add('on')
        setEdit(!editOn)
        focusOn.focus()
    }
    const getName=(e)=>{
        setFirstName(e.target.value)

        setObj({
            ...obj,
            firstName: e.target.value
        });
    }
    const getLastName=(e)=>{
        setLastName(e.target.value)

        setObj({
            ...obj,
            lastName: e.target.value
        });
    }
    const getAddress=(e)=>{
        setAddress(e.target.value)
        setObj({
            ...obj,
            address: e.target.value
        });
    }
    const getEmail=(e)=>{
        setEmail(e.target.value)
        setObj({
            ...obj,
            email: e.target.value
        });
    }
    const getMobile=(e)=>{
        setMobile(e.target.value)
        setObj({
            ...obj,
            mobile: e.target.value
        });
    }
    const getAge=(e)=>{
        setAge(e.target.value)
        setObj({
            ...obj,
            age: e.target.value
        });
    }
    const save=()=>{

        if(Object.keys(obj).length){
           // console.log(obj,"objjjjjjjjjjjjjj")
            editUserInfo(props.data.id,obj).then(()=>{
                setEdit(!editOn)
                const el=document.getElementById('no');
                const el1=document.getElementById('yes');
                el.classList.remove('on')
                el1.classList.remove('on')
            }).catch((e)=>{
                console.log(e,"edit-error")
            })
        }
  else{
            console.log("obj is emptyyyy save")
        }

       console.log(props.data.id,"save")
    }
    const cancel=()=>{
        const el=document.getElementById('no');
        const el1=document.getElementById('yes');
        el.classList.remove('on')
        el1.classList.remove('on')
        setEdit(!editOn)
        setFirstName('');
        setLastName('');
        setAddress('');
        setEmail('');
        setMobile('');
        setAge('');
    }
    return (
          <div className="row clearfix  brd" >
              <div id='yes' className="edit" title="Save" onClick={!editOn?edit:save}/> <div id="no" className="no" title="Cancel" onClick={editOn?cancel:null}/>
              <CardContent className={classes.col}>
                  <Grid container justify="center" alignItems="center">
                      <UploadAvatarImage userId = {props.data.id} avatar ={props.data.avatar} editable ={editOn}/>
                  </Grid>
                 </CardContent>
                    <CardContent className={classes.width}>
                        <Typography className={classes.btBorder} gutterBottom variant="h5" component="h2">
                            My Profile
                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="p" >
                            <span className={classes.color}>full name:</span>
                            {!editOn?firstName?firstName:`${props.data.firstName } `:
                                <input className="edit" size={firstName?firstName.length:`${(props.data.firstName ).length}`} value={firstName?firstName:`${props.data.firstName}`} onChange={getName} />
                            }
                            {!editOn?lastName?lastName:` ${props.data.lastName}`:
                                <input className="edit" value={lastName?lastName:`${props.data.lastName}`} onChange={getLastName} />
                            }
                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="p">
                            <span className={classes.color}>address:</span>
                            {!editOn?address?address:`${props.data.address}`:
                                <input className="edit" value={address?address:`${props.data.address}`} onChange={getAddress} />
                            }
                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="p">
                            <span className={classes.color}>email:</span>
                            {!editOn?email?email:`${props.data.email}`:
                                <input className="edit" value={email?email:`${props.data.email}`} onChange={getEmail} />
                            }

                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="p">
                            <span className={classes.color}>mobile:</span>
                            {!editOn?mobile?mobile:`${props.data.mobile}`:
                                <input className="edit" value={mobile?mobile:`${props.data.mobile}`} onChange={getMobile} />
                            }

                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="p">
                            <span className={classes.color}>age:</span>
                            {!editOn?age?age:`${props.data.age}`:
                                <input className="edit" value={age?age:`${props.data.age}`} onChange={getAge} />
                            }

                        </Typography>
                    </CardContent>
          </div>
    )
}

