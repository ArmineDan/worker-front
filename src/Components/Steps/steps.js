import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
//import image from './favicon.ico';
import * as img1 from './images/st1.png';
import * as img2 from './images/st2.png';
import * as img3 from './images/st3.png';
import * as img4 from './images/st4.png';
import * as img5 from './images/st5.png';



const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1,
    },

    footerBackground: {
        padding: '40px 0 20px',
        lineHeight: '1.8',

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

export default function Steps() {
    const classes = useStyles();


    return (
        <div id="footer" className={ classes.footerBackground}>
            <div className="container clearfix">
                <div className="row">
                    <div className="col-lg-12">
                    <div className="heading-block title-center-own center">
                        <h3>We exist to connect master and client !</h3>
                        <span>How it works:</span>
                    </div>

                    </div>
                </div>
                    <div className="row">
                    <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12 own1" >
                            <div className="title-center-own counter counter-large t300 form-style-5">
                                <legend>Step <span class="number">1</span>  </legend>

                            </div>
                            <img style={{height: "170px"}} src={img1} alt="Step1"/>
                            <p className="text-muted mb-0 pb-5 border-bottom">
                                Register your profile in our website.
                                {/*A master registers and creates his profile.*/}
                            </p>
                    </div>
                        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12 own2">
                            <div className="title-center-own counter counter-large t300 form-style-5">
                                <legend> Step <span class="number">2</span> </legend>
                            </div>
                            <img style={{height: "170px"}} src={img2} alt="Step2"/>
                            <p className="text-muted mb-0 pb-5 border-bottom">
                                Potential clients will search you in our site based on your skills.
                                {/*Client seeks his master throughout  our web site.*/}
                            </p>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12 own1" >
                            <div className="title-center-own counter counter-large t300 form-style-5">
                                <legend>Step <span class="number">3</span>  </legend>
                            </div>
                            <img style={{height: "170px"}} src={img3} alt="Step3"/>
                            <p className="text-muted mb-0 pb-5 border-bottom">
                                If your skills match to client's needs you will got a call shortly.
                                {/*Client finds the master in just 2 seconds and contacts him.*/}
                            </p>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12  own2">
                            <div className="heading-block title-center-own counter counter-large t300 ">
                                <h3>Finnally</h3>
                            </div>
                            <div  style={{display: "flex"}} >
                            <img style={{height: "153px"}}  src={img4} alt="Step4"/>
                            <img style={{height: "100px"}}  src={img5} alt="Step4"/>
                            </div>
                            <p className="text-muted mb-0 pb-5 border-bottom">
                                Hurraaay!!! After client is satisfied with your job, it's a paytime.
                                {/*Both sides are satisfied and happy.*/}

                            </p>
                        </div>
             </div>
            </div>
        </div>



    );

}
