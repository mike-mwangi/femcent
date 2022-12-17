// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import "./Wallet.sol";


contract walletCreator {
    multiSig[] wallets;
    multiSig workingWallet;

    function createWallet(
        uint256 totalOwners,
        string memory nname,
        string memory ddescription
    ) public returns (multiSig) {
        multiSig current = new multiSig(totalOwners, nname, ddescription);
        wallets.push(current);
        workingWallet = current;
        return current;
    }

    function add_owner(address new_owner) public {
        workingWallet.add_owner(new_owner);
    }

    function getWallets() public view returns (multiSig[] memory) {
        return wallets;
    }
}
