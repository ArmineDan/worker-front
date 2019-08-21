
import React from 'react';
import './styles/loader.css'

const Loader = () => {
    return (
        <div className="page-transition-wrap">
            <div className="css3-spinner">
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