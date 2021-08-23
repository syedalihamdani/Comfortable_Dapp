 import React from 'react';
 import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Comfortableabi from "./artifacts/Comfortable.json";
import getWeb3 from "./getWeb3";
import "./App.css";
 const App = () => {
   const loadweb3=async ()=>{
      if(window.ethereum){
        window.web3=new web3(window.ethereum)
        await window.ethereum.enable()
      }
   }
   loadblockchaindata();
   return (
     <>
       sdfsd
     </>
   )
 }
 
 export default App;
 