// Ensure the DOM is loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
  const connectButton = document.getElementById("connectButton");
  const walletAddressDisplay = document.getElementById("walletAddress");
  const balanceDisplay = document.getElementById("balance");
  const networkDisplay = document.getElementById("network");

  connectButton.addEventListener("click", async () => {
    // Check if MetaMask is installed
    if (typeof window.ethereum !== 'undefined') {
      try {
        // Request access to the user's Ethereum accounts
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        walletAddressDisplay.innerText = `Connected: ${address}`;
        
        // Fetch and display wallet balance
        const balance = await provider.getBalance(address);
        const balanceInEth = ethers.utils.formatEther(balance);
        balanceDisplay.innerText = `Balance: ${balanceInEth} ETH`;

        // Fetch and display network information
        const network = await provider.getNetwork();
        networkDisplay.innerText = `Network: ${network.name} (${network.chainId})`;
      } catch (error) {
        console.error("Error connecting wallet:", error);
        walletAddressDisplay.innerText = "Error connecting wallet.";
      }
    } else {
      walletAddressDisplay.innerText = "Please install MetaMask!";
    }
  });
}); 