// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DecentralizedTestPrep {

    // Owner of the contract (typically the administrator or teacher)
    address public owner;

    // Mapping to store token balance of each participant
    mapping(address => uint256) public tokenBalance;

    // Event to notify when tokens are rewarded
    event TokensRewarded(address participant, uint256 tokens);

    // Constructor to set the owner of the contract
    constructor() {
        owner = msg.sender;
    }

    // Modifier to restrict access to the owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    // Function to reward tokens to a participant for test preparation
    function rewardTokens(address participant, uint256 tokens) public onlyOwner {
        require(participant != address(0), "Invalid participant address");
        require(tokens > 0, "Token amount must be greater than zero");

        // Add tokens to the participant's balance
        tokenBalance[participant] += tokens;

        // Emit event to log the reward
        emit TokensRewarded(participant, tokens);
    }

    // Function to check the token balance of a participant
    function getTokenBalance(address participant) public view returns (uint256) {
        return tokenBalance[participant];
    }
}