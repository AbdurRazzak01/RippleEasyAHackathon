// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleContract {
    uint256 public data;

    event DataUpdated(uint256 newData);

    constructor(uint256 initialData) {
        data = initialData;
    }

    function setData(uint256 newData) public {
        data = newData;
        emit DataUpdated(newData); // Emit an event when data is updated
    }
}
