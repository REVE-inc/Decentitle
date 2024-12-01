// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// 自定義 ERC-20 代幣合約
contract WORKmint is ERC20, Ownable {
    constructor(address initialOwner) ERC20("WORK", "WORK") Ownable(initialOwner) {}

    // Mint 函數，僅限合約擁有者調用
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
