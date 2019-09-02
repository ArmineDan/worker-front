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
    const [err_a,setErr_a]= useState('');
    const [save_check,setSave_check]= useState('');
    const [err_m,setErr_m]= useState('');
    const [err_ad,setErr_ad]= useState('');
    const [err_ln,setErr_ln]= useState('');
    const [err_fn,setErr_fn]= useState('');
    const [obj,setObj]= useState({});


    useEffect(()=>{
    },[editOn,firstName,lastName,address,mobile,age,obj,err_a,err_m,err_ad,err_ln,err_fn,save_check,props])


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
        let elem=e.currentTarget;
        let value=e.target.value;

        switch(type){
            case 'age':
                if(value<18 || value>=100 || isNaN(value)){
                    setErr_a('The age  should be  18 - 100');
                    elem.classList.add('not-valid')
                                    }
                else{
                    elem.classList.remove('not-valid');
                    setErr_a('')
                }
                break;
            case 'mobile':
             let data= value.substring(1);
                 data=data.replace(/\s/g,'');
                if(isNaN(data)|| data.length !== 11){
                    setErr_m('Invalid mobile number');
                    elem.classList.add('not-valid')
                }


                else{
                    elem.classList.remove('not-valid')
                    setErr_m('')

                }
                break;
            case 'address':
                if(value.length<5){
                    setErr_ad('Invalid address');
                    elem.classList.add('not-valid')


                }
                else{
                    elem.classList.remove('not-valid')
                    setErr_ad('')
                }
                break;
            case 'lastName':
                const regex = /\d/g;
                const r=regex.test(value);
                if( r || value.length < 3  ){
                    setErr_ln('Invalid lastName');
                    elem.classList.add('not-valid')

                }
                else{
                    elem.classList.remove('not-valid')
                    setErr_ln('')

                }
                break;

            case 'firstName':
                const reg = /\d/g;
                const f=reg.test(value);
                if(value.length < 3 || f ){
                    setErr_fn('Invalid firstName');
                    elem.classList.add('not-valid')



                }
                else{
                    elem.classList.remove('not-valid')
                    setErr_fn('')

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


        if( Object.keys(obj).length && !(err_a || err_m || err_ad || err_ln || err_fn)){
           // console.log(obj,"objjjjjjjjjjjjjj")
            editUserInfo(props.data.id,obj).then(()=>{
                //cancel();
                props.refresh();
               setEdit(!editOn);
                const el=document.getElementById('no');
                const el1=document.getElementById('yes');
                el.classList.remove('on');
                el1.classList.remove('on');
                setSave_check("");
            }).catch((e)=>{
                console.log(e,"edit-error")
            })
        }
  else{
            if(Object.keys(obj).length){
                setSave_check("The data is missing or wrong!")
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
        setSave_check("");
        setErr_a('');
        setErr_m('');
        setErr_ad('');
        setErr_ln('');
        setErr_fn('');
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

                        <span className="err">{save_check}</span>

                        <Typography className={classes.btBorder} gutterBottom variant="h5" component="h2">
                            My Profile
                        </Typography>

                        <Typography variant="body1" color="textSecondary" component="p" >
                            <span className={classes.color}>full name:</span>
                            {!editOn?`${props.data.firstName } `:
                                <input className="edit" size={firstName.length} title={err_fn?err_fn:''} value={firstName} onChange={getName} onBlur={(e)=>valid(e,'firstName')} />
                            }
                            {!editOn?` ${props.data.lastName}`:
                                <input className="edit" value={lastName} title={err_ln?err_ln:''} onChange={getLastName} onBlur={(e)=>valid(e,'lastName')} />
                            }
                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="p">
                            <span className={classes.color}>address:</span>
                            {!editOn? props.data.address:
                                <input className="edit" value={address} title={err_ad?err_ad:''} onChange={getAddress} onBlur={(e)=>valid(e,'address')} />
                            }
                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="p">
                            <span className={classes.color}>email:</span>
                          {props.data.email}
                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="p">
                            <span className={classes.color}>mobile:</span>
                            {!editOn?props.data.mobile:
                                <input className="edit" value={mobile} title={err_m?err_m:''} onChange={getMobile} onBlur={(e)=>valid(e,'mobile')} />
                            }

                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="p">
                            <span className={classes.color}>age:</span>
                            {!editOn?props.data.age:
                                <input className="edit" value={age} title={err_a?err_a:''} onChange={getAge} onBlur={(e)=>valid(e,'age')} />
                            }


                        </Typography>
                    </CardContent>
          </div>
    )
}

