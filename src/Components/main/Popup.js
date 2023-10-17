import React from 'react';
import { AiOutlineClose } from "react-icons/ai";
import styles from "./main.module.css";


function Popup( { fare, route, setIsOpenPopup })
{

  const animationStyle = {
    position: 'relative',
    background: 'white',
    borderRadius: '10px',
    width: '900px',
    padding: '100px 10px',
    animation: `${styles.dropTop} 0.3s linear`, 
  };


  
    return (
      <div
      onClick={setIsOpenPopup.bind(this,false)}

      style={
        {
          position: "fixed",
          background: "rgba(0,0,0,0.6)",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }>

        <div 

        onClick={(e)=> e.stopPropagation()}

        style={
          animationStyle}
        >
          <div style={{paddingBottom:'10px'}}>
            <h1 style={{marginTop:-60}}>Shorest Path</h1>
            <div 
            onClick={setIsOpenPopup.bind(this,false)}
            style={{  cursor: "pointer",
            position: "absolute",
            top: 10,
            right: 10}}
            
            ><AiOutlineClose/></div>
          </div>
          <div>

           <div className="results">
        <p><b style={{fontSize:'25px',fontWeight:'bold'}} id="fare_head">Fare:</b> <span id="fare" style={{fontSize:'22px',color:'limegreen',fontWeight:'bold',paddingLeft:'10px'}}>{fare}</span></p> 

        <br/>           <br/>   

        <p><b style={{
          fontSize:'25px',
          marginBottom:'10px'
        }} id="route_head">Route: </b>
          <span id="route" style={{fontFamily:'monospace',color:'black',fontSize:'22px',lineHeight:'30px'}}>{route}</span>
        </p>
  </div>
          </div>
        </div>
      </div>
    )
}
export default Popup;