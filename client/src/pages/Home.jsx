import React, { useEffect,useState } from 'react'
import useAuth from '../hooks/useAuth'
import useUser from '../hooks/useUser';
//Importing Web3 Library for Ethereum
import Web3 from 'web3';

export default function Home() {
    const { user } = useAuth();
    const getUser = useUser()

    useEffect(() => {
        getUser()
    }, [])

    // HTL: Code for showing Eth Wallet Balance on login -- to be added auto load refresh
	//-----------------------------------------------------------------------------------
	
     const [balance, setBalance] = useState(null);

     useEffect(() => {
       const fetchBalance = async () => {
         try {
    
			// Replace with your actual user address or method to get it
           const walletAddress = user.ewa;
           const testnet = `https://mainnet.infura.io/v3/3e8202a3eb634f20920c866e39613a59`;
		   // Change API key & URL in above line
		   
           const web3 = new Web3(new Web3.providers.HttpProvider(testnet));
          
           // Fetch balance
           const balanceWei = await web3.eth.getBalance(walletAddress);
          
           const balanceEth = web3.utils.fromWei(balanceWei, 'ether');
          
          
           // Update state with balance
           setBalance(balanceEth);

         } catch (error) {
           console.error("Error fetching balance:", error);
         }
       };
  
       fetchBalance();
     }, []);

    // End of code by HTL: Auto load refresh need to be added in react ---------------

    return (
        <div className='container mt-3'>
            <h2>
                <div className='row'>
                    <div className="mb-12">
                    {/* HTL: Show ETH Wallet Balance */}
                    {user?.email !== undefined ? `List user Ethereum balance  ${balance}` : 'Please login first'} 
                    </div>
                </div>
            </h2>
        </div>
    )
}
