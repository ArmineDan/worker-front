import React,{useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
//import image from './favicon.ico';
import image from '../header/logo-footer.png';
import {subscribeUser} from  '../../firebase/fireManager';


let setTime=null;
const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1,
    },

    footerBackground: {
        padding: '40px 0 20px',
        lineHeight: '1.8',
      backgroundColor: "#3e3d3d",
      color: '#bababa',
      margin: 0,
        display:'flex'
    },

    footerIcon: {
      color: "#e8e8e8",
    },


    row:
    {
      display: "flex",
      flexDirection: "row",
      marginLeft: "50px",
      paddingTop: "50px",
    },
    subscr:{
        marginTop: '10px',
        fontSize: '13px',
        color: '#ff9800'}





}));

export default function Footer() {
    const classes = useStyles();
    const [email,setEmail]= useState('');
    const [err_m,setErr_m]= useState('');
    useEffect(() => {
        return()=>{clearTimeout(setTime)}
    }, [email]);
   const getInput=(e)=>{

       setErr_m('')
       setEmail(e.target.value)
    }
    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    const subscribe=()=>{
       validateEmail(email)?
        subscribeUser(email).then((data)=>{

            setEmail('');
            setErr_m('Thank you for Subscribing!')
            setTime=setTimeout(()=>{
                setErr_m('');
                setEmail('');

            }, 1400)
       }).catch((e)=> {
            if(e.hasOwnProperty('err_mess')){
                setErr_m(e.err_mess);
                setTime=setTimeout(()=>{
                    setErr_m('');
                    setEmail('');

                }, 1400)
            }

        }):
           setErr_m('Please input valid email address')
    }

  return (
<div id="footer" className={ classes.footerBackground}>
  <div className="container clearfix">
      <div className="row">

                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12">
                <img style={{width: "65px",margin: "8px"}}src={image} alt="Varpet Logo"/>
                </div>
                <div className="col-lg-6 col-md-10 col-sm-10 col-xs-12">
                <p style={{marginTop:"15px"}}>
                  Copyright 2019 - HiVarpet.am Incorporated. All rights reserved.
                </p>

                </div>
                <div  className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                <form id="widget-subscribe-form"  role="form" method="post" className="nobottommargin" noValidate="validate">

                    <div className="input-group divcenter">

                        <input id="widget-subscribe-form-email" name="widget-subscribe-form-email" value={email}
                               className="form-control required email" placeholder="Enter your Email" required  onChange={getInput}/>
                            <div className="input-group-append">
                                <button className="btn btn-success" type="button" onClick={subscribe} >Subscribe</button>
                                {err_m?<div className="err-subscribe">{err_m}</div>:null}
                            </div>
                    </div>
                </form>
                    <h6 className={classes.subscr}><strong>Subscribe</strong> to Our Newsletter to get Important News</h6>
                </div>
            </div>
      </div>
</div>



  );

}
