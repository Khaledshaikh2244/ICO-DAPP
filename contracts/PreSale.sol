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
    string symbol;
}
    
// outer layout
mapping(address => TokenDetails) public tokenDetails;
address[] public allSupportedTokens;
address public owner;

// Events
event TokenReceived(address indexed token, address indexed from, uint256 amount);
event TokenTransferred(address indexed token, address indexed to, uint256 amount);
event TokenWithdraw(address indexed token, address indexed to, uint256 amount);
event TokenAdded(address indexed token, uint256 indexed price, address indexed creator, string symbol, string name);

// Modifiers
modifier supportedToken(address _token){
    require(tokenDetails[_token].supported == true, "Token is not supported");
    _;
}

modifier onlyOwner() {
    require(msg.sender == owner, "Caller is not the owner");
    _;
}

modifier onlyCreator(address _token) {
    require(msg.sender == tokenDetails[_token].creator, "Caller is not the token creator");
    _;
}

receive() external payable {
    revert("Contract does not support Ether directly");
}

constructor() {
    owner = msg.sender;
}

// Functions

// contract level function
function createICOSale(address _token, uint256 _price) external {
    IERC20 token = IERC20(_token);
    string memory tokenName = token.name();
    string memory tokenSymbol = token.symbol();

    tokenDetails[_token] = TokenDetails({
        token: _token,
        supported: true,
        price: _price,
        creator: msg.sender,
        name: tokenName,
        symbol: tokenSymbol
    });

    allSupportedTokens.push(_token);

    // initializing add token event
    emit TokenAdded(_token, _price, msg.sender, tokenSymbol, tokenName);
}

// handling overflow and underflow
function multiply(uint256 x, uint256 y) internal pure returns (uint256 z) {
    require(y == 0 || (z = x * y) / y == x, "Multiplication overflow");
}

// buyToken function
function buyToken(address _token, uint256 _amount) external payable supportedToken(_token) {
    require(_amount > 0, "Amount must be greater than 0");

    TokenDetails memory details = tokenDetails[_token];

    // total cost for user on purchase
    uint256 totalCost = multiply(details.price, _amount);
    require(msg.value == totalCost, "Incorrect Ether amount sent");

    // transferring payment from contract to the creator (purchasing user)
    (bool sent,) = details.creator.call{value: msg.value}("");
    require(sent, "Failed to transfer ether to the creator");

    // transfer token back to user	 
    IERC20 token = IERC20(_token);
    require(token.transfer(msg.sender, _amount * 10**8), "Transfer Failed");

    // emit event
    emit TokenTransferred(_token, msg.sender, _amount);
}

// getting balance
function getBalance(address _token) external view returns(uint256) {
    require(tokenDetails[_token].supported, "Token not supported");

    IERC20 token = IERC20(_token);
    return token.balanceOf(address(this));
}

// returning list of supported token
function getSupportedTokens() external view returns (address[] memory) {
    return allSupportedTokens;
} 

// withdraw function
function withdrawToken(address _token, uint256 _amount) external onlyCreator(_token) supportedToken(_token) {
    require(_amount > 0, "Amount must be greater than 0");

    // building relationship with interface
    IERC20 token = IERC20(_token);

    // checking balance first in the contract
    uint256 balance = token.balanceOf(address(this));
    require(balance >= _amount, "Insufficient token balance");

    // handling the withdrawal/transferring
    require(token.transfer(msg.sender, _amount), "Token transfer failed");

    // emit event
    emit TokenWithdraw(_token, msg.sender, _amount);
}

// for checking price and compare token is left in contract for sale or not
function getTokenDetails(address _token) external view returns (TokenDetails memory) {
    require(tokenDetails[_token].supported, "Token not supported");

    return tokenDetails[_token];
}

// get tokens created by specific user
function getCreatedBy(address _creator) external view returns (TokenDetails[] memory) {
    // counting the length 
    // checking how many tokens are created by creator
    uint256 count = 0;

    // calculate length
    for (uint256 i = 0; i < allSupportedTokens.length; i++) {
        if (tokenDetails[allSupportedTokens[i]].creator == _creator) {
            count++;
        }
    } 

    TokenDetails[] memory tokens = new TokenDetails[](count);
    uint256 index = 0;	
    for (uint256 i = 0; i < allSupportedTokens.length; i++) {
        if (tokenDetails[allSupportedTokens[i]].creator == _creator) {
            tokens[index] = tokenDetails[allSupportedTokens[i]];
            index++;
        }
    }
    return tokens; 
}

function getAllTokens() external view returns (TokenDetails[] memory) { 
    uint256 length = allSupportedTokens.length;

    TokenDetails[] memory tokens = new TokenDetails[](length);
    for (uint256 i = 0; i < length; i++) {
        tokens[i] = tokenDetails[allSupportedTokens[i]];
    }
    return tokens;
}
}
