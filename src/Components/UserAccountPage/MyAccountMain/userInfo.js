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
    const [mobile,setMobile]= useState();
    const [age,setAge]= useState();
    const [err,setErr]= useState('');
    const [obj,setObj]= useState({});


    useEffect(()=>{
    },[editOn,firstName,lastName,address,mobile,age,obj,err,props]);
    const edit=(e)=>{
        e.target.classList.add('on');
        const el=document.getElementById('no');
        const focusOn=document.querySelectorAll('input')[0];
        el.classList.add('on');
        setEdit(!editOn);
        setFirstName(props.data.firstName);
        setLastName(props.data.lastName);
        setAddress(props.data.address);
        setMobile(props.data.mobile);
        setAge(props.data.age);
        focusOn.focus()
    };
    const valid=(e,type)=>{
        let value=e.target.value;
       // console.log(value,"value")
        switch(type){
            case 'age':
                if(value<18 || value>=100 || isNaN(value)){
                    setErr('Invalid Age Number, the age  should be greater then 18')
                }
                else{
                    if(err){setErr('')}
                }
                break;
            case 'mobile':
             let data= value.substring(1);
                 data=data.replace(/\s/g,'');
                if(isNaN(data)|| data.length !== 11){
                    setErr('Invalid mobile')
                }
                else{
                    if(err){setErr('')}
                }
                break;
            case 'address':
                if(value.length<5){
                    setErr('Invalid address')
                }
                else{
                    if(err){setErr('')}
                }
                break;
            case 'lastName':
                if(value.length < 3){
                    setErr('Invalid lastName')
                }
                else{
                    if(err){setErr('')}
                }
                break;

            case 'firstName':

                if(value.length < 3){
                    setErr('Invalid firstName')
                }
                else{
                    if(err){setErr('')}
                }
                break;

            default:
        }
    };
    const getName=(e)=>{
        setFirstName(e.target.value);

        setObj({
            ...obj,
            firstName: e.target.value
        });
    };
    const getLastName=(e)=>{
        setLastName(e.target.value);

        setObj({
            ...obj,
            lastName: e.target.value
        });
    };
    const getAddress=(e)=>{
        setAddress(e.target.value);
        setObj({
            ...obj,
            address: e.target.value
        });
    };

    const getMobile=(e)=>{
        setMobile(e.target.value);
        setObj({
            ...obj,
            mobile: e.target.value
        });
    };
    const getAge=(e)=>{
        setAge(e.target.value);
        setObj({
            ...obj,
            age: e.target.value
        });
    };
    const save=()=>{
        let mob = mobile?mobile.substring(1):'no';
        mob=mob.replace(/\s/g,'');
        if(Object.keys(obj).length && firstName.length > 3 && lastName.length >3 && !(isNaN(mob)|| mob.length !== 11) &&
            !(age<18 || age>=100 || isNaN(age))&& !(address.length<5)
        ){
           // console.log(obj,"objjjjjjjjjjjjjj")
            editUserInfo(props.data.id,obj).then(()=>{
                //cancel();
                props.refresh();
               setEdit(!editOn);
                const el=document.getElementById('no');
                const el1=document.getElementById('yes');
                el.classList.remove('on');
                el1.classList.remove('on')
            }).catch((e)=>{
                console.log(e,"edit-error")
            })
        }
  else{
            if(Object.keys(obj).length){
                setErr("We can't save , because some data are missing or wrong!")
            }

           // console.log("obj is emptyyyy save")
        }

      // console.log(props.data.id,"save")
    };
    const cancel=()=>{
        const el=document.getElementById('no');
        const el1=document.getElementById('yes');
        el.classList.remove('on');
        el1.classList.remove('on');
        setEdit(!editOn);
        setFirstName('');
        setLastName('');
        setAddress('');
        setMobile('');
        setAge('');
        setErr("");
    };
    return (
          <div className="row clearfix  brd" >
              <div id='yes' className="edit" title="Save" onClick={!editOn?edit:save}/> <div id="no" className="no" title="Cancel" onClick={editOn?cancel:null}/>
              <CardContent className={classes.col}>
                  <Grid container justify="center" alignItems="center">
                      <UploadAvatarImage userId = {props.data.id} avatar ={props.data.avatar} editable ={editOn}/>
                  </Grid>
                 </CardContent>
                    <CardContent className={classes.width}>
                        <span className="err">{err}</span>
                        <Typography className={classes.btBorder} gutterBottom variant="h5" component="h2">
                            My Profile
                        </Typography>

                        <Typography variant="body1" color="textSecondary" component="p" >
                            <span className={classes.color}>full name:</span>
                            {!editOn?`${props.data.firstName } `:
                                <input className="edit" size={firstName.length} value={firstName} onChange={getName} onBlur={(e)=>valid(e,'firstName')} />
                            }
                            {!editOn?` ${props.data.lastName}`:
                                <input className="edit" value={lastName} onChange={getLastName} onBlur={(e)=>valid(e,'lastName')} />
                            }
                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="p">
                            <span className={classes.color}>address:</span>
                            {!editOn? props.data.address:
                                <input className="edit" value={address} onChange={getAddress} onBlur={(e)=>valid(e,'address')} />
                            }
                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="p">
                            <span className={classes.color}>email:</span>
                          {props.data.email}
                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="p">
                            <span className={classes.color}>mobile:</span>
                            {!editOn?props.data.mobile:
                                <input className="edit" value={mobile} onChange={getMobile} onBlur={(e)=>valid(e,'mobile')}/>
                            }

                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="p">
                            <span className={classes.color}>age:</span>
                            {!editOn?props.data.age:
                                <input className="edit" value={age} onChange={getAge} onBlur={(e)=>valid(e,'age')} />
                            }

                        </Typography>
                    </CardContent>
          </div>
    )
}

