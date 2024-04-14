// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Ticket is ERC721, Ownable {
    uint256 public nextEventId;
    uint256 public nextTicketId;

    // Structure to represent a ticket
    struct TicketInfo {
        uint256 eventId;
        uint256 price;
        address owner;
        bool isAvailable;
    }

    // Structure to represent an event
    struct Event {
        string name;
        uint256 startTime;
        uint256 endTime;
        uint256 basePrice;
        uint256 maxTickets;
        uint256 ticketsSold;
        mapping(uint256 => uint256) dynamicPrices; // TicketId => Price
        mapping(uint256 => bool) refundedTickets; // TicketId => Refunded
    }

    mapping(uint256 => Event) public events;
    mapping(uint256 => TicketInfo) public tickets;

    // Event for ticket purchase
    event TicketPurchased(address buyer, uint256 ticketId, uint256 price);

    constructor() ERC721("SmartTicket", "STKT") Ownable(msg.sender) {}
// Function to create an event
// Function to create an event
// Function to create an event
function createEvent(
    string memory _name,
    uint256 _startTime,
    uint256 _endTime,
    uint256 _basePrice,
    uint256 _maxTickets
) external onlyOwner {
    events[nextEventId].name = _name;
    events[nextEventId].startTime = _startTime;
    events[nextEventId].endTime = _endTime;
    events[nextEventId].basePrice = _basePrice;
    events[nextEventId].maxTickets = _maxTickets;
    events[nextEventId].ticketsSold = 0;

    nextEventId++;
}




    // Function to purchase a ticket for a specific event
    function purchaseTicket(uint256 _eventId) external payable {
        Event storage eventObj = events[_eventId];
        require(block.timestamp >= eventObj.startTime, "Event has not started yet");
        require(block.timestamp <= eventObj.endTime, "Event has ended");
        require(eventObj.ticketsSold < eventObj.maxTickets, "No tickets available");
        
        uint256 currentTicketId = nextTicketId;
        tickets[currentTicketId] = TicketInfo({
            eventId: _eventId,
            price: calculateTicketPrice(_eventId),
            owner: msg.sender,
            isAvailable: true
        });
        _mint(msg.sender, currentTicketId);
        eventObj.ticketsSold++;

        nextTicketId++;

        // Emit event
        emit TicketPurchased(msg.sender, currentTicketId, tickets[currentTicketId].price);
    }

    // Function to calculate the ticket price based on dynamic pricing
    function calculateTicketPrice(uint256 _eventId) internal view returns (uint256) {
        Event storage eventObj = events[_eventId];
        uint256 dynamicPrice = eventObj.dynamicPrices[eventObj.ticketsSold];
        if (dynamicPrice != 0) {
            return dynamicPrice;
        } else {
            return eventObj.basePrice;
        }
    }

    // Function to resell a ticket
    function resellTicket(uint256 _ticketId, uint256 _newPrice) external {
        require(ownerOf(_ticketId) == msg.sender, "Not the ticket owner");
        require(_newPrice > 0, "Invalid price");
        tickets[_ticketId].price = _newPrice;
    }

    // Function to refund a ticket
    function refundTicket(uint256 _ticketId) external {
        require(ownerOf(_ticketId) == msg.sender, "Not the ticket owner");
        require(!events[tickets[_ticketId].eventId].refundedTickets[_ticketId], "Ticket already refunded");
        events[tickets[_ticketId].eventId].refundedTickets[_ticketId] = true;
        payable(msg.sender).transfer(tickets[_ticketId].price);
        _burn(_ticketId);
    }

    // Function to issue NFT as souvenir
    function issueNFT(address _to, uint256 _eventId) external onlyOwner {
        require(events[_eventId].ticketsSold > 0, "No tickets sold for the event");
        uint256 randomTicketId = uint256(keccak256(abi.encodePacked(block.timestamp, _eventId))) % nextTicketId;
        _safeMint(_to, randomTicketId);
    }
}
