// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract Settlement {
    address public usdcAddress;

    event NexusPayment(address indexed from, address indexed to, uint256 amount, bytes32 indexed contractId);

    constructor(address _usdcAddress) {
        usdcAddress = _usdcAddress;
    }

    function pay(address _to, uint256 _amount, bytes32 _contractId) external {
        require(_to != address(0), 'Invalid recipient');
        require(_amount > 0, 'Amount must be positive');
        bool success = IERC20(usdcAddress).transfer(_to, _amount);
        require(success, 'USDC transfer failed');
        emit NexusPayment(msg.sender, _to, _amount, _contractId);
    }

    function balance(address _account) external view returns (uint256) {
        return IERC20(usdcAddress).balanceOf(_account);
    }
}
