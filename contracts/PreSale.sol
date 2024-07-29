// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

// interface of erc20 token
//  2 ways =>  frontend , within smart contract


interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns(bool);
    function balanceOf(address account) external view returns(uint256);
    function symbol() external view returns (string memory);
    function totalSupply() external view returns(uint256);
    function name() external view returns(string memory);
}

contract ICOMarketplace{

// tokenDetails

struct TokenDetails {
    address token;
    bool supported;
    uint256 price;
    address creator;
    string name;
    string symbool;
}
    
// outer layout

mapping(address => TokenDetails) public tokendetails;
address [] public allSupportedTokens;
address public owner;


// Events

event TokenRecieved(address indexed token, address indexed from, uint256 amount);
event TokenTransferred(address indexed token, address indexed to, uint256 amount);
event TokenWithDraw(address indexed token, address indexed to, uint256);
event TokenAdded(address indexed token,  uint256 indexed price, address indexed creator ,  string indexed symbol, string indexed name)

// Modifiers

modifier supportedToken(address _token){
    require(tokenDetails[_token].supported == true , "Token is not supported");
    _;
}

modifier onlyOwner(address _owner) {
    require(msg.sender == owner, "Caller is not the owner");
    _;
}

modifier onlyCreater(address _creator) {
    require(msg.sender == tokenDetails[_token].creator, "Caller is not the token creator");
    _;
}


 recieve () external payable{
    revert("Contract does not supported ehter directly");
 }

 constructor() {
    owner = msg.sender;
 }

//  functions

// contract level fnc
function createICOSale(address _token, uint256 _price) external{
    IERC20 token = IERC20(_token);
    string memory tokenName = token.name();
    string memory tokenSymbol = token.symbol();

    tokenDetails[_token] = TokenDetails({
        token : _token,
        supported : true,
        price : _price,
        creator: _creator,
        name : tokenName,
        symbol : tokenSymbol
    });

    allSupportedTokens.push(_token);

    // initializing add token event
    emit TokenAdded(_token , _price, msg.sender, tokenName, tokenSymbol) 
}


// handling overflow$underflow
function multiply(uint256 x, uint256 y ) internal returns (uint256 z) {}


// buyToken


// amount = how many token
// price = on current token price
function buyToken(address _token, uint256 _amount)  supportedToken(_token){
 require(amount >  0, "Amount must be greater than the 0 ");

// 

TokenDetails memory details = tokenDetails[_tokens];

//total cost for user on purcahse
uint256 totalCost = multiply (details.price, _amount);
require(msg.value == totalCost, "Incorrect Ether amount sent");

//transferring pymnt from contract to the creator(purchasing user)
(bool.sent,) = details.creator.call{value : msg.value} ("");
require(sent, "Failed to transfer ether to the creator");

//tranfser token back to user	 
IERC20 token = IERC20(_token);

require(token.transfer(msg.sender, _amount * 10**8), "Transfer Failed");

//init evnt
emit TokenTransferred(_token, msg.sender, _amount);


}

// getting balance
 function getBalance(address _token) external view returns(uint256){
  require(tokenDetails[_token].supported, "Token not supported");
 
 //address tokenAddress == address(_token);
 //require(tokenAddress != address(0), "Token contract not found");
 
  IERC20 token = IERC20(_token);
  return token.balanceOf(address(this));
 
}


// returning list of supported token
 function getSupportedToken() external view  returns (address[] memory) {
  return allSupportedTOkens; 
} 

//  wihtdraw fnc
function withdrawToken (address _token , uint256 amount) external onlyCreater(_token) supportedToken(_token){
 require(_amount > 0, "amount must be greater than 0");
 
//building relationship with interface
 IERC20 token = IERC20(_token)

//checking balance first in the contract
uint256 balance = token.balanceOf(address(this));
require(balance >= _amount, "Insufficinet token balance");

//handling the withdrawl/transferring

require(token.transfer(msg.sender, _amount), "Token transfer failed");

//
emit TokenWithdraw(token, msg.sender,_amount);

}

// for checking price and comapare token is left in conrtact for sale or not
function getTokenDetails(address _token) external view returns(TokenDetails[] memory) {
 require(tokenDetails[_token].supported, "Token not supported");

 return tokenDetails[_token];
 
}

// get token created bu specifi users
function getCreatedBy(address _creator) external view returns (TokenDetails[] memory) {
 //counting the length 
 // checking of how many tokens are created by creator

 uint256 = 0;
 
//calculate lenght
for(uint256 i =0; i < allSupportedTokens.length; i++) {
  if(tokenDetails[allSupportedTokens[i]].creator == _creator) {
  count++;
}
} 
 TokenDetails[] memory tokens = new TokenDetails[](count);
 uint256 indexed = 0;	
 for(uint256 i= 0; i <allSupportedTokens.lenght; i++) {
 tokens[index] = tokenDetails[allSupportedTokens[i]];
 index++;
}
 returns tokens; 
}

function getAllTokens()  external view returns (TokenDetails[] memory) { 
 uint256 length = allSupportedTokens.length;
 
 TokenDetails[] memory tokens = new TokensDetails[] (length);
 for(uint256 i = 0; i < length; i++){
 tokens[i] = tokenDetails[allSupportedTokens[i]];

}
  returns tokens;
}

}



