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
(
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
    string memory tokenSymbol = token.symbol()
}


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
function getCreatedBy(address _creator) external view returns (TokenDetails[] memory) {}

function getAllTokens()  external view returns (TokenDetails[] memory) {}

}



