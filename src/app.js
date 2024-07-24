const contractAddress = '0x5f26abfd35c26070185171629a468856720725cc'; // Replace with your deployed contract address
const contractABI = [
    
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_text1",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_text2",
                    "type": "string"
                }
            ],
            "name": "storeText",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "retrieveText",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    
];

let web3;
let contract;
let accounts;

window.addEventListener('load', async () => {
    if (typeof window.ethereum !== 'undefined') {
        web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        accounts = await web3.eth.getAccounts();
        contract = new web3.eth.Contract(contractABI, contractAddress);
        document.getElementById('connectButton').innerText = 'Wallet Connected';
    } else {
        alert('Please install MetaMask to use this dApp!');
    }
});

document.getElementById('storeButton').addEventListener('click', async () => {
    const text1 = document.getElementById('text1').value;
    const text2 = document.getElementById('text2').value;
    await contract.methods.storeText(text1, text2).send({ from: accounts[0] });
    alert('Text stored successfully!');
});

document.getElementById('retrieveButton').addEventListener('click', async () => {
    const result = await contract.methods.retrieveText().call({ from: accounts[0] });
    document.getElementById('retrievedText1').innerText = result[0];
    document.getElementById('retrievedText2').innerText = result[1];
});