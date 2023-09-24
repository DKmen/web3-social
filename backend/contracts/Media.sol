// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Media {
    struct Post {
        address sender;
        string message;
    }
    Post[] private post;
    address[] private account;
    address private _owner;
    mapping(address => address[]) public followers;

    constructor() {
        _owner = msg.sender;
    }

    event PostEvent(address indexed sender, string message);
    event CreateUserEvent(address indexed account);

    function getPost() public view returns (Post[] memory) {
        return post;
    }

    function makePost(string memory message) public {
        post.push(Post(msg.sender, message));
        emit PostEvent(msg.sender, message);
    }

    function createAccount() public {
        bool contain = true;
        for (uint256 i = 0; i < account.length; i++) {
            if (msg.sender == account[i]) {
                contain = false;
                break;
            }
        }
        if (contain) {
            emit CreateUserEvent(msg.sender);
            account.push(msg.sender);
        }
    }

    function getAllUsers() public view returns (address[] memory) {
        address[] memory userList = new address[](account.length - 1);
        uint256 index = 0;

        for (uint256 i = 0; account.length > i; i++) {
            if (msg.sender != account[i]) {
                userList[index] = account[i];
                index++;
            }
        }
        return userList;
    }

    function followPeople(address followerAddress) public {
        bool contain = false;
        for (uint256 i = 0; i < account.length; i++) {
            if (msg.sender == followerAddress) {
                break;
            }
            if (account[i] == followerAddress) {
                contain = true;
            }
        }
        if (contain) {
            followers[msg.sender].push(followerAddress);
        }
    }

    function getFollower() public view returns (address[] memory) {
        return followers[msg.sender];
    }
}
