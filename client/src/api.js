import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import './AboutUs.css'; // Import the CSS file
import logo from './img/ibm.png';
import BuyTicket from './BuyTicket'; // Import the BuyTicket component

const ConcertData = ({ contractAddress, abi }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const API_KEY = 'SaSmEoEE9VP0U7sRpKz8GuJcPeP8K4CP'; // Replace 'YOUR_API_KEY' with your actual Ticketmaster API key
  const currencyConversionRates = {
    XRP: 1, // 1 XRP = 1 XRP
    ETH: 0.01, // Assuming 1 ETH = 100 XRP
    // Add more currencies as needed
  };
  
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&keyword=concert&size=8`);
        if (!response.ok) {
          throw new Error('Failed to fetch event data');
        }
        const eventData = await response.json();
        // Manually set ticket prices and apply discounts
        const modifiedEvents = eventData._embedded.events.map(event => ({
          ...event,
          price: calculateTicketPrice(event),
        }));
        setEvents(modifiedEvents);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, []);

  const calculateTicketPrice = (event) => {
    // Generate random ticket price between 1 and 5
    const basePrice = Math.floor(Math.random() * 45) + 5;
    // Randomly apply discount to some tickets
    const isDiscounted = Math.random() < 0.5; // 50% chance of being discounted
    if (isDiscounted) {
      // Apply 20% discount
      const discountedPrice = Math.floor(basePrice * 0.8); // 20% discount
      return discountedPrice;
    }
    return basePrice;
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&keyword=${searchTerm}&size=3`);
      if (!response.ok) {
        throw new Error('Failed to fetch event data');
      }
      const eventData = await response.json();
      // Manually set ticket prices and apply discounts
      const modifiedEvents = eventData._embedded.events.map(event => ({
        ...event,
        price: calculateTicketPrice(event),
      }));
      setEvents(modifiedEvents);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleTicketPurchase = (event) => {
    // Assuming event object has an id property
    const purchasedTicket = { id: event.id, name: event.name, price: event.price };
    // Implement your logic to handle purchased tickets
    console.log('Purchased ticket:', purchasedTicket);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="concertData">
      <div className="container">
      <h1 style={{textAlign: 'center'}}>Your Next Concert!</h1>
  <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
    <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search by event name" style={{width: '300px', padding: '10px'}} />
    <button onClick={handleSearch} style={{padding: '10px 20px', marginLeft: '10px'}}>Search</button>
  </div>
      </div>
      <div className="grid-containerdata">
        {events.map(event => (
          <div key={event.id} className="grid-itemdata">
            <EventData event={event} />
            <BuyTicket
              ticketPrice={event.price} // Assuming event object has a price property for ticket price
              contractAddress={contractAddress}
              abi={abi}
              onPurchase={() => handleTicketPurchase(event)} // Pass the handleTicketPurchase function
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const EventData = ({ event }) => {
  const { name, images } = event;
  const imageUrl = images && images.length > 0 ? images[0].url : logo; // Use default logo if no image available

  return (
    <div>
      <h2>{name}</h2>
      <img src={imageUrl} alt={name} style={{ width: '100px', height: 'auto' }} />
      <hr />
    </div>
  );
};

export default ConcertData;
