import React from 'react';

const PurchasedTickets = ({ tickets }) => (
    <div>
      <h2>Purchased Tickets</h2>
      <ul>
        {tickets.map(ticket => (
          ticket ? ( // Check if ticket is defined before destructuring
            <li key={ticket.id}>{ticket.name} - ${ticket.price}</li>
          ) : (
            <li key={Math.random()}>Invalid Ticket</li>
          )
        ))}
      </ul>
    </div>
  );
  





export default PurchasedTicket;
