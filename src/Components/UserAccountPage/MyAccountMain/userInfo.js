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
    },
    flex:{
         display:'flex'
    }


});

export default function UserInfo(props) {
    let take_dbo=props.data.age.split('/')
    const classes = useStyles();
    const [editOn,setEdit]= useState(false);
    const [firstName,setFirstName]= useState();
    const [lastName,setLastName]= useState();
    const [address,setAddress]= useState();
    const [mobile,setMobile]= useState();
    const [age,setAge]= useState();
    const [year,setYear]= useState(take_dbo[2]?+take_dbo[2]:1900);
    const [day,setDay]= useState(take_dbo[1]?+take_dbo[1]:1);
    const [month,setMonth]= useState(take_dbo[0]&&take_dbo[0]!== '_'?+take_dbo[0]:1);
    const [err_a,setErr_a]= useState('');
    const [save_check,setSave_check]= useState('');
    const [err_m,setErr_m]= useState('');
    const [err_ad,setErr_ad]= useState('');
    const [err_ln,setErr_ln]= useState('');
    const [err_fn,setErr_fn]= useState('');
    const [obj,setObj]= useState({});
    let curr_year= new Date().getFullYear();
    let days=[];
    let years=[];
    let months=[1,2,3,4,5,6,7,8,9,10,11,12];

    for(let i=1; i<32; i++){

        days[i]=i;
    }
    for(let i=1900; i<curr_year; i++){

        years[i]=i;
    }
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
        let value;
        if (type === 'age'){
            value=e;
        }
       else{
            value=e.target.value;
        }

        switch(type){
            case 'age':
                //debugger
                return !(value < 18 || value >= 75);
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

            default: return false
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

    const getYear=(e)=>{
        setYear(e);

        setObj({
            ...obj,
            age: month+'/'+day+'/'+e
        });
    };
    const getDay=(e)=>{
        setDay(e);

        setObj({
            ...obj,
            age: month+'/'+e+'/'+year
        });
    };
    const getMonth=(e)=>{
        setMonth(e);
        setObj({
            ...obj,
            age: e+'/'+day+'/'+year
        });

    };


    const get_Age=(DOB)=> {
        let today = new Date();
        let birthDate = new Date(DOB);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age = age - 1;
        }
        return age;
    }
    const save=()=>{

        const age=month+'/'+day+'/'+year;
        let count_age =get_Age(age);

        if(valid(count_age,'age') && Object.keys(obj).length && !(err_m || err_ad || err_ln || err_fn) ){
          //console.log(obj,"objjjjjjjjjjjjjj")
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
        else if(!valid(count_age,'age')){
            setSave_check("The age  should be  18 - 75")
        }
  else{
            if(Object.keys(obj).length){
                setSave_check("The data is missing or wrong!")
            }

                }


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
                            {!editOn?`${props.data.firstName  } `:
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

                            {!editOn? <><span className={classes.color}>age:</span> {get_Age(props.data.age) && get_Age(props.data.age)>0?get_Age(props.data.age)  :"_"} </>:<>
                            <span className={classes.color}>Date of birth: </span>
                            <Typography variant="body1" color="textSecondary" component="span" className={classes.flex} >
                                <select className="selectpicker" id="month" onChange={(e)=>{getMonth(e.target.value)}}  onBlur={(e)=>{console.log(e.target.value,"blurrr")}}>
                                    {
                                        <option  defaultValue={month}>{month}</option>
                                    }
                                    {
                                        months.map((item,index)=> {
                                            return  (
                                                <option key={index} value={item}>{item}</option>
                                            )
                                        })
                                    }

                                </select>
                                <select className="selectpicker" id="day" onChange={(e)=>{getDay(e.target.value)}}>
                                    {
                                        <option defaultValue={day}>{day}</option>
                                    }
                                    {
                                        days.map((item,index)=> {
                                            return  (
                                                <option key={index} value={item}>{item}</option>
                                            )
                                        })
                                    }

                                </select>

                                <select className="selectpicker" id="year" onChange={(e)=>{getYear(e.target.value)}}>
                                    {
                                        <option defaultValue={year}>{year}</option>
                                    }
                                    {
                                        years.map((item,index)=> {
                                            return  (
                                                <option key={index} value={item}>{item}</option>
                                            )
                                        })
                                    }

                                </select>
                            </Typography>

                            </>
                                // <input className="edit" value={age} title={err_a?err_a:''} onChange={getAge} onBlur={(e)=>valid(e,'age')} />
                            }


                        </Typography>
                    </CardContent>
          </div>
    )
}

