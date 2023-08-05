import { ethers } from "ethers";

export default function pp() {
  const provider = new ethers.AlchemyProvider('sepolia', 'zfLkf49x6uCpGUh6J_of7j1DvxZXMoHz');
  const predefinedPrivateKey = '74bc64ba057d9af6a3a845e188f72ec572b003eca5493f492a22d6b8d3936e8b';

  const handleButtonClick = async () => {
    const predefinedAccount = new ethers.Wallet(predefinedPrivateKey, provider);
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const metamaskAccount = accounts[0];

    const response = await fetch('/api/calc');
    const { amount } = await response.json();
    const transaction = {
      to: metamaskAccount,
      value: ethers.parseEther(amount.toString()), 
    };

    const signedTransaction = await predefinedAccount.sendTransaction(transaction);
    console.log('Transaction sent:', signedTransaction);
    alert('no need to tank')
    await fetch('/api/upd', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  return (
    <button onClick={handleButtonClick}>Send 0.1 Ether</button>
  );
}
