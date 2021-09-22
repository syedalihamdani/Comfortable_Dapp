import React, { useState } from 'react';
import getWeb3 from './getWeb3';
import Comfortable from './artifacts/Comfortable.json';
const App = () => {
  const [web3,setweb3]=useState();
  const [account,setaccount]=useState();
  const [contract,setcontract]=useState();
 const connect = async () => {
      const Web3 = await getWeb3();
      setweb3(Web3);
      const accounts = await Web3.eth.getAccounts();
      setaccount(accounts[0]);
       const networkId = await Web3.eth.net.getId();
       const deployedNetwork = Comfortable.networks[networkId];
       const instance = new Web3.eth.Contract(
         Comfortable.abi,
         deployedNetwork && deployedNetwork.address);
         setcontract(instance);
 }
connect();
const name= async()=>{
  await contract.methods.name().call((err,result)=>{console.log(result)});
 await contract.methods.view1().call((err,result)=>{console.log(result)});
 await contract.methods.balance().call((err,result)=>{console.log(result)});
 await contract.methods.sevent().call((err,result)=>{console.log(result)});
 await contract.methods.selfpay().send({value:web3.utils.toWei("1","ether"),from:account});
}
  return (
    <>
      <button onClick={()=>name()}>connect to MetaMask</button>
    </>
  )
}
export default App;
