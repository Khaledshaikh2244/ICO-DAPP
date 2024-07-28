// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

// interface of erc20 token
//  2 ways =>  frontend , within smart contract


interface IERC20 {
}

contract ICOMarketplace{

// tokenDetails

struct TokenDetails {

}
    
// outer layout

// Modifiers

modifier supportedToken(){}

modifier onlyOwner() {}

modifier onlyCreater() {}


 recieve() external payable{}

 constructor() {}

//  functions

// contract level fnc
function createICOSale(address _token, uint256 _price) {}


// handling overflow$underflow
function multiply(uint256 x, uint256 y ) internal returns (uint256 z) {}


// buyToken

// amount = how many token
// price = on current token price
function buyToken(address _token, uint256 _amount)  supportedToken(_token){
}

// getting balance
 function getBalance(address _token) external view returns(uint256){}


// returning list of supported token
 function getSupportedToken() external view  returns (address[] memory) {
 } 

//  wihtdraw fnc
function withdraw(address _token , uint256 amount) external onlyCreater(_token) supportedToken(_token){}

// for check price and comapare tokenis left in conrtact for sale or not
function getTokenDetails(address _token) external view returns(TokenDetails[] memory) {}

// get token created bu specifi users
function getCreatedBy(address _creator) external view returns (TokenDetaisls[] memory) {}

function getAllTokens()  external view returns (TokenDetails[] memory) {}

}

}




