let web3;
let contract;
let accounts;
const contractAddress = "0x32880ed747bc5bbe4a2712682004398f32a16e0c"; // ใช้ของ G3X24 จริง

async function connectWallet() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        accounts = await web3.eth.getAccounts();
        contract = new web3.eth.Contract(stakingABI, contractAddress);
        document.getElementById("wallet").innerText = "Connected: " + accounts[0];
    } else {
        alert("Please install MetaMask");
    }
}

async function stake() {
    const amount = document.getElementById("amount").value;
    const duration = parseInt(document.getElementById("duration").value);
    if (amount > 0) {
        const decimals = 18;
        const stakeAmount = BigInt(amount * (10 ** decimals)).toString();
        await contract.methods.stake(stakeAmount, duration).send({ from: accounts[0] });
        alert("Stake Successful");
    }
}

async function claim() {
    const index = document.getElementById("index").value;
    await contract.methods.claim(index).send({ from: accounts[0] });
    alert("Claimed Successfully");
}

async function unstake() {
    const index = document.getElementById("index").value;
    await contract.methods.unstake(index).send({ from: accounts[0] });
    alert("Unstaked Successfully");
}
