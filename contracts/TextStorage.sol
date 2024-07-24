// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TextStorage {
    struct TextData {
        string text1;
        string text2;
    }
    
    mapping(address => TextData) private textStorage;

    function storeText(string memory _text1, string memory _text2) public {
        textStorage[msg.sender] = TextData(_text1, _text2);
    }

    function retrieveText() public view returns (string memory, string memory) {
        TextData memory data = textStorage[msg.sender];
        return (data.text1, data.text2);
    }
}
