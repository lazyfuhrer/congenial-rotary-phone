// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FunToken {
    // Data
    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 public totalSupply;

    // This creates an array with all balances
    mapping (address => uint256) public balanceOf;

    // This generates a public event on the blockchain that will notify clients
    event Transfer(address indexed from, address indexed to, uint256 value);

    // Initializes contract with initial supply tokens to the creator of the contract
    constructor(
        uint256 _initialSupply,
        string memory _tokenName,
        string memory _tokenSymbol,
        uint8 _decimalUnits
    ) {
        name = _tokenName;
        symbol = _tokenSymbol;
        decimals = _decimalUnits;
        totalSupply = _initialSupply * 10 ** uint256(decimals);  // Update total supply with the decimal amount
        balanceOf[msg.sender] = totalSupply;                // Give the creator all initial tokens
        emit Transfer(address(0), msg.sender, totalSupply); // Broadcast a message to the blockchain
    }

    // Send coins
    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(_to != address(0), "Invalid address");
        require(balanceOf[msg.sender] >= _value, "Insufficient balance");
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value); // Broadcast a message to the blockchain
        return true;
    }

    // Mint new tokens
    function mint(address _to, uint256 _value) public {
        require(_to != address(0), "Invalid address");
        totalSupply += _value;
        balanceOf[_to] += _value;
        emit Transfer(address(0), _to, _value); // Broadcast a message to the blockchain
    }

    // Burn tokens
    function burn(uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value, "Insufficient balance");
        totalSupply -= _value;
        balanceOf[msg.sender] -= _value;
        emit Transfer(msg.sender, address(0), _value); // Broadcast a message to the blockchain
        return true;
    }
}
