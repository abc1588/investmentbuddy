import React from "react";
import "./loader.scss";

export default props=>{
    return (
        <div className='spinner center'>
            <div className="preloader-wrapper big active center">
            <div className="spinner-layer spinner-blue-only">
              <div className="circle-clipper left">
                <div className="circle"></div>
              </div><div className="gap-patch">
                <div className="circle"></div>
              </div><div className="circle-clipper right">
                <div className="circle"></div>
              </div>
            </div>
          </div>
        </div>
    );
}

