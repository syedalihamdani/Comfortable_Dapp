import React, {useState } from 'react';
import './App.css';
import getWeb3 from './getWeb3';
import Comfortable from './artifacts/Comfortable.json';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
const App = () => {
  const [web3,setweb3]=useState();
  const [account,setaccount]=useState();
  const [contract,setcontract]=useState();
  const [networkName,setnetworkName]=useState("Wallet not");
  const [Balance,setBalance]=useState();
  const [Name,setName]=useState();
  const [View,setView]=useState();
  const [Balance2,setBalance2]=useState();
  const [amount,setamount]=useState();
  const [Event,setEvent]=useState();
 const connect = async () => {
      const Web3 = await getWeb3();
      setweb3(Web3);
      const accounts = await Web3.eth.getAccounts();
      setaccount(accounts[0]);
      const balance = await Web3.eth.getBalance(accounts[0]);
      // console.log(balance);
      setBalance(balance);
       const networkId = await Web3.eth.net.getId();
       if(networkId===1){
        setnetworkName("Mainnet")
        alert("Connect to Ropsten network otherwise it won't work")
      }else if(networkId===3){
        setnetworkName("Ropsten")
        
      }else if(networkId===42){
        setnetworkName("Kovan")
        alert("Connect to Ropsten network otherwise it won't work")
      }else if(networkId===4){
        setnetworkName("Rinkeby")
        alert("Connect to Ropsten network otherwise it won't work")
      }else if(networkId===5){
        setnetworkName("Goerli")
        alert("Connect to Ropsten network otherwise it won't work")
      }else if(networkId===5777){
        setnetworkName("Ganache")
        alert("Connect to Ropsten network otherwise it won't work")
      }else{
        setnetworkName("Undefined")
        alert("Connect to Ropsten network otherwise it won't work")
      }
       const deployedNetwork = Comfortable.networks[networkId];
       const instance = new Web3.eth.Contract(
         Comfortable.abi,
         deployedNetwork && deployedNetwork.address);
         setcontract(instance);
 }
connect();
const value=(event)=>{
    setamount(event.target.value);
}
const selfpay= async()=>{
  if(amount<1){
    alert(`${amount} Negative amount can't be transfer`)
  }else if(networkName!=="Ropsten"){
    alert("Connect to Ropsten network otherwise it won't work")
  }else{
    await contract.methods.selfpay().send({value:amount,from:account}).then(()=>{setamount(0)});
  }
}
const name=async()=>{
  if(networkName!=="Ropsten"){
    alert("Connect to Ropsten network otherwise it won't work")
  }else{
  await contract.methods.name().call((err,result)=>{setName(result)});
  }

}
const view=async ()=>{
  if(networkName!=="Ropsten"){
    alert("Connect to Ropsten network otherwise it won't work")
  }else{
  await contract.methods.view1().call((err,result)=>{setView(result)});
  }
}
const balance=async ()=>{
  if(networkName!=="Ropsten"){
    alert("Connect to Ropsten network otherwise it won't work")
  }else{
  await contract.methods.balance().call((err,result)=>{setBalance2(result)});
  }

}
const Events=async ()=>{
  if(networkName!=="Ropsten"){
    alert("Connect to Ropsten network otherwise it won't work")
  }else{
    await contract.methods.sevent().call();
    await contract.getPastEvents('show',{fromBlock:0},(err,result)=>(setEvent(result.length)));
  }
  }
const restart=()=>{
 window.location.reload(false);
}
  return (
    <>
  <div className="page">  
  <nav className="navbar">
  <div className="upper">
      <h4>{networkName} Connected</h4>
      <h4>Balance: {Balance} wei</h4>
      <button className="btn" onClick={restart}><h4>Connect to Wallet</h4></button></div>
  <div className="lower">Account:{account}</div>
  </nav>
  <div className="Main">
  <div className="section">
  <div className="screen">{Name}</div>
      <button className="btn2" onClick={()=>name()}>Get Name</button>
  </div>
  <div className="section">
  <div className="screen">{View}</div>
      <button className="btn2" onClick={()=>view()}>Get View</button>
  </div>
  <div className="section">
  <div className="screen">{Balance2}</div>
      <button className="btn2" onClick={()=>balance()}>Get Balance</button>
  </div>
  <div className="section">
  <input className="input" placeholder="Enter the amount" type="number" onChange={value}></input>
      <button className="btn2" onClick={()=>selfpay()}>Pay to contract</button>
  </div>
  <div className="section">
  <div className="screen">{Event}</div>
      <button className="btn2" onClick={()=>Events()}>Call event</button>
  </div>
      
  </div>
  </div>
    </>
  )
}
export default App;
