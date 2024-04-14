import React, { useEffect, useState } from 'react';
import { Client, dropsToXrp, rippleTimeToISOTime } from 'xrpl';
import './XrpWallet.css'; // Import the CSS file with your styles
import ripple from "./img/ripple.png";

const XrpWallet = () => {
    const [accountInfo, setAccountInfo] = useState(null);
    const [ledgerDetails, setLedgerDetails] = useState(null);
    const [sendXrpForm, setSendXrpForm] = useState({ destination: '', amount: '', destinationTag: '' });
    const [client, setClient] = useState(null);

    useEffect(() => {
        const initializeClient = async () => {
            const newClient = new Client('wss://s.altnet.rippletest.net:51233');
            await newClient.connect();
            setClient(newClient);

            // Fetch account info and ledger details
            const accountInfoResponse = await newClient.request({
                command: 'account_info',
                account: 'rN1AQqP8rERQp8GDV2TRVELEZEfKADwVY7'
            });
            setAccountInfo(accountInfoResponse.result.account_data);

            const ledgerDetailsResponse = await newClient.request({
                command: 'ledger',
                ledger_index: 'validated',
                ledger_hash: ''
            });
            setLedgerDetails(ledgerDetailsResponse.result.ledger);
        };

        initializeClient();

        return () => {
            if (client) {
                client.disconnect();
            }
        };
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSendXrpForm({ ...sendXrpForm, [name]: value });
    };

    const handleSendXrp = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        try {
            if (!client) return; // Check if client is initialized
            const txJson = {
                TransactionType: 'Payment',
                Account: sendXrpForm.classicAddress,
                Destination: sendXrpForm.destination,
                DestinationTag: sendXrpForm.destinationTag,
                Amount: sendXrpForm.amount,
            };

            const { result } = await client.submit(txJson);
            console.log(result);
            // Optionally, update account info after sending XRP
            // Fetch account info again and update state
        } catch (error) {
            console.error('Error sending XRP:', error);
            // Display an error message to the user
        }
    };

    return (
        <div className="wallet_container">
            <div className="main_logo">
                <img src={ripple} alt="Logo" className="logo" style={{ width: "90px", height: "70px", borderRadius: "50%", marginTop: "15px", position: "relative" }} />
            </div>
            <div className="wallet_details">
                <h2>Account Information:</h2>
                {accountInfo ? (
                    <div>
                        <p><strong>Account Address:</strong> {accountInfo.Account}</p>
                        <p><strong>Balance:</strong> {dropsToXrp(accountInfo.Balance)} XRP</p>
                    </div>
                ) : null}
            </div>
            <div className="ledger_details">
                <h2>Latest Ledger Details:</h2>
                {ledgerDetails && (
                    <div>
                        <p><strong>Ledger Index:</strong> {ledgerDetails.ledger_index}</p>
                        <p><strong>Ledger Hash:</strong> {ledgerDetails.ledger_hash}</p>
                        <p><strong>Close Time:</strong> {rippleTimeToISOTime(ledgerDetails.close_time)}</p>
                    </div>
                )}
            </div>
            <div className="send_xrp_container">
                <h2>Send XRP:</h2>
                <form onSubmit={handleSendXrp}>
                    <label>
                        Destination Address:
                        <input type="text" name="destination" value={sendXrpForm.destination} onChange={handleInputChange} required />
                    </label>
                    <label>
                        Amount (XRP):
                        <input type="text" name="amount" value={sendXrpForm.amount} onChange={handleInputChange} required />
                    </label>
                    <label>
                        Destination Tag:
                        <input type="text" name="destinationTag" value={sendXrpForm.destinationTag} onChange={handleInputChange} />
                    </label>
                    <button type="submit">Send XRP</button>
                </form>
            </div>
        </div>
    );
};

export default XrpWallet;
