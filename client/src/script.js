// script.js

// Function to fetch account information
async function fetchAccount() {
    try {
      const response = await fetch('http://localhost:5001/account');
      if (response.ok) {
        const data = await response.json();
        console.log('Account Information:', data);
      } else {
        console.error('Failed to fetch account:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching account:', error);
    }
  }
  
  // Function to fetch transaction data
  async function fetchTransactions() {
    try {
      const response = await fetch('http://localhost:5001/transactions');
      if (response.ok) {
        const data = await response.json();
        console.log('Transaction Data:', data);
      } else {
        console.error('Failed to fetch transactions:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  }
  
  // Call the fetchAccount function
  fetchAccount();
  
  // Call the fetchTransactions function
  fetchTransactions();
  
  
