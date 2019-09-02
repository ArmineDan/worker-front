
import React from 'react';
import './styles/loader.css'

const Loader = (props) => {
    return (
        <div className="page-transition-wrap" >
            <div className="css3-spinner" style={{backgroundColor:props.bg?props.bg:'rgb(64, 64, 64)'}}>
                <div className="css3-spinner-ball-scale-multiple">
                    <div/>
                    <div/>
                    <div/>
                </div>
            </div>
        </div>
    )
}

export default  Loader;