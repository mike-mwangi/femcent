// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "./WalletCreator.sol";

contract multiSig {
    multiSig[] chamas;
    address public owner;

    // mapping to allow for other addresses to interact with this contract, determines permissions
    mapping(address => uint8) private owners;

    // track total owners for proportional agreement
    uint256 public total_owners;
    uint256 public limitOwners;
    string public description;
    string public name;

    // tran_ID var and time lock declaration
    uint256 private transaction_ID_incre;
    uint256 private curr_time_lock = block.timestamp;

    // struct (class) transaction details for approval
    struct Transaction {
        address from;
        address to;
        uint256 amount;
        uint8 current_signature_count;
        string purpose;
    }

    // map the transaction id to a transaction
    mapping(uint256 => Transaction) private transactions;

    // dynamic array for transactions that need to be processed
    uint256[] private pending_transactions;

    // interaction with wallet requires owner status, require to throw errors
    // WHAT DOES THE _; MEAN, RESEARCH
    modifier verified_super_owner() {
        require(msg.sender == owner);
        _;
    }

    // validity check, super owner or approved owner
    modifier is_owner_valid() {
        require(msg.sender == owner || owners[msg.sender] == 1);
        _;
    }

    // wallet events stored on the blockchain
    event deposit_made(address from, uint256 amount);
    event withdraw_made(address from, uint256 amount);
    event transfer_made(address from, address to, uint256 amount);
    event transaction_signed(address by, uint256 transaction_ID);
    event transaction_pending(
        address by,
        address to,
        uint256 amount,
        uint256 transaction_ID
    );
    event transaction_completed(
        address to,
        uint256 amount,
        uint256 transaction_ID
    );

    // initial smart contract caller is owner
    constructor(
        uint256 totalOwners,
        string memory nname,
        string memory ddescription
    ) {
        limitOwners = totalOwners;
        name = nname;
        description = ddescription;
        owner = msg.sender;
        chamas.push(this);
    }

    // adding new owners, only super owner can do this
    function add_owner(address new_owner) public {
        require(total_owners <= limitOwners);
        owners[new_owner] = 1;
        total_owners++;
    }

    // delete unwanted owners in same manner
    function delete_owner(address del_owner) public verified_super_owner {
        owners[del_owner] = 0;
        total_owners--;
    }

    // any public wallet can deposit
    function deposit_funds() public payable {
        emit deposit_made(msg.sender, msg.value);
    }

    function getname() public view returns (string memory) {
        return name;
    }

    // transfer to function
    function transfer_funds(address to, uint256 amount) public is_owner_valid {
        // multisig has enough eth to settle transfer, error throw in not case
        require(address(this).balance >= amount);

        // use private global incrementor
        uint256 transaction_ID = transaction_ID_incre++;

        // generate and populate a transaction struct in memory as transaction proposition
        //   no initial signatures
        Transaction memory pending_transaction;
        pending_transaction.from = msg.sender;
        pending_transaction.to = to;
        pending_transaction.amount = amount;
        pending_transaction.current_signature_count = 0;

        // add proposed transaction to the transactions mapping datastructure
        //    tran_id is position in ds
        //    id is added to awaiting confirmation array
        transactions[transaction_ID] = pending_transaction;
        pending_transactions.push(transaction_ID);

        // emit a proposition event
        emit transaction_pending(msg.sender, to, amount, transaction_ID);
    }

    // call to check pending transactions
    function check_pending_transactions()
        public
        view
        is_owner_valid
        returns (uint256[] memory)
    {
        return pending_transactions;
    }

    //
    function sign_pending_transaction(uint256 transaction_ID)
        public
        is_owner_valid
    {
        // transaction was done in memory, use storage to reference it, use same struct name!
        // access Tran struct from memory
        Transaction storage pending_transaction = transactions[transaction_ID];

        // validity checks, address cant be none address, creator cannot sign, contract cannot be signed by indiv > 1
        require(address(0) != pending_transaction.from);
        require(msg.sender != pending_transaction.from);

        pending_transaction.current_signature_count++;
        emit transaction_signed(msg.sender, transaction_ID);

        if (
            pending_transaction.current_signature_count >=
            ((total_owners * 2) / 3)
        ) {
            // validate balance, transfer, emit to chain, delete transaction
            require(
                address(this).balance >= pending_transaction.amount &&
                    block.timestamp >= curr_time_lock
            );
            payable(pending_transaction.to).transfer(
                pending_transaction.amount
            );
            emit transaction_completed(
                pending_transaction.to,
                pending_transaction.amount,
                pending_transaction.current_signature_count
            );
            delete_transaction(transaction_ID);
        }
    }

    // arrays are not dynamic in solidity, we need to tidy up after we delete indexes
    function delete_transaction(uint256 transaction_ID) public is_owner_valid {
        bool del_index = false;

        // iterate until id index found
        // once found, overwrite i + 1 into i
        for (uint256 i = 0; i < pending_transactions.length - 1; i++) {
            if (pending_transactions[i] == transaction_ID) {
                del_index = true;
            }

            if (del_index == true) {
                pending_transactions[i] = pending_transactions[i + 1];
            }
        }
        // delete last element in index (copy), reduce length of array, delete id from mapping
        delete pending_transactions[pending_transactions.length - 1];
        delete transactions[transaction_ID];
    }

    // lock withdrawals for x amount of time in days, if 0 no time lock
    function modify_time_lock(uint256 time)
        private
        is_owner_valid
        returns (uint256)
    {
        require(msg.sender == owner && time >= 0);
        curr_time_lock = block.timestamp + (time * 1 days);
        return view_time_lock();
    }

    //
    function view_time_lock() public view returns (uint256) {
        return curr_time_lock;
    }

    //
    function multi_sig_balance() public view returns (uint256) {
        return address(this).balance;
    }

    function getChamas() public view returns (multiSig) {
        return chamas[0];
    }
}
