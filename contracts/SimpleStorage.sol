// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    // State variable to store the integer value
    uint256 private storedData;

    // Event to log changes to the stored data
    event DataChanged(uint256 newData);

    // Constructor to initialize the contract with an initial value
    constructor(uint256 initialValue) {
        storedData = initialValue;
    }

    // Write function to set the stored data
    function set(uint256 x) public {
        storedData = x;
        emit DataChanged(x);
    }

    // Read function to get the stored data
    function get() public view returns (uint256) {
        return storedData;
    }
}