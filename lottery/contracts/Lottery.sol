// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    address [] public players;
    address public lastWinner;

    function Lottery(){
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value > .01 ether );
        players.push(msg.sender);
    }

    function random() public view returns(uint256){
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
    }

    //already know the onlyOwner but only following the tutorial
    function pickWinner() public restricted {
        uint index = random() % players.length;
        players[index].transfer(address(this).balance);
        lastWinner = players[index];
        players = new address[](0);
    }


    modifier restricted(){
        require(msg.sender == manager);
        _;
    }

    function getPlayers() public view returns(address[]){
        return players;
    }
}

