 pragma solidity ^0.8.0;

 contract Comfortable{
     string public name="Ali";
     event show(string);
     function Showname() public view returns(string memory){
         return name;
     }
     function view1() public pure returns(string memory){
         return "hello to myself";
     }
     function selfpay() public payable{

     }
     function balance() public view returns(uint){
         return(address(this).balance);
     }
     function send(address _recever) public payable{
         payable(_recever).transfer(msg.value);

     }
     function sevent() public{
         emit show("The event is shown");
     }
  

 }