// events 
eventHandlerChange('first-ticket-increase', 'first-ticket-input', true);
eventHandlerChange('first-ticket-decrease', 'first-ticket-input', false);
eventHandlerChange('economy-ticket-increase', 'economy-ticket-input', true);
eventHandlerChange('economy-ticket-decrease', 'economy-ticket-input', false);

// events handler
function eventHandlerChange(eventId, ticket, status) {
    document.getElementById(eventId).addEventListener('click',  function() {
        ticketCalculator(ticket,  status);
    });
}

// tickets calculation
function ticketCalculator(ticket, status) {
    const ticketQuantity = getTicketInputValue(ticket);
    let ticketTotal = ticketQuantity;
    if(status == true){
        ticketTotal = ticketQuantity + 1;
    }
    if(status == false && ticketQuantity > 0){
        ticketTotal = ticketQuantity - 1;
    }
    document.getElementById(ticket).value = ticketTotal;
    ticketSubtotalPrice();
}

// tickets sub total price
function ticketSubtotalPrice() {
    const firstTicketQuantity = getTicketInputValue('first-ticket-input');
    const economyTicketQuantity = getTicketInputValue('economy-ticket-input');
    const ticketSubTotalPrice = firstTicketQuantity * 150 + economyTicketQuantity * 100;
    document.getElementById('ticket-subtotal').innerText = ticketSubTotalPrice;
    ticketTotalPrice(ticketSubTotalPrice);
}

// getInput value
function getTicketInputValue (ticket) {
    const ticketInput  = document.getElementById(ticket);
    const ticketQuantity = parseInt(ticketInput.value);
    return ticketQuantity;
}

// ticket total price with vat cost
function ticketTotalPrice(ticketSubTotalPrice) {
    const ticketVatPrice = ticketSubTotalPrice * 0.1; // vat 10%
    const ticketTotalPrice = ticketSubTotalPrice + ticketVatPrice;
   document.getElementById('ticket-vat').innerText = ticketVatPrice;
   document.getElementById('ticket-total').innerText = ticketTotalPrice;
}

// ticket booking order events
document.getElementById('ticket-booking').addEventListener('click', function() {
    hideBookingForm();
    ticketOrderDetails();
});

// hide ticket booking form
function hideBookingForm() {
    const bookingForm = document.querySelector('.booking-form');
    bookingForm.style.display = "none";
}

// ticket order details after submit
function ticketOrderDetails() {
    const firstTicketQuantity = getTicketInputValue('first-ticket-input');
    const economyTicketQuantity = getTicketInputValue('economy-ticket-input');
    const rootDiv= document.querySelector('.booking');
    // new div element create
    const newDiv = document.createElement('div');
    newDiv.style.cssText = "padding: 20px; background-color: white; text-align: center; color: green";
    newDiv.textContent = "Order Success"
    rootDiv.appendChild(newDiv);
    // ticket order element create
    orderInfo('First Ticket', firstTicketQuantity, 150)
    orderInfo('Economy Ticket', economyTicketQuantity, 100)
    function orderInfo(title, ticketQuantity, price) {
        const h2 = document.createElement('h2');
        h2.textContent = title + "(" + ticketQuantity + ")" + " = $" + ticketQuantity * price;
        newDiv.appendChild(h2);
    }

    // horizontal element create
    horizontalElement();
    function horizontalElement() {
        const hr = document.createElement('hr');
        newDiv.appendChild(hr);
    }

    // sub total element create
    const subTotal = firstTicketQuantity * 150 + economyTicketQuantity * 100
    subTotalElement();
    function subTotalElement() {
        const subTotalElement = document.createElement('h2');
        subTotalElement.innerHTML = "SubTotal &nbsp; &nbsp; = &nbsp; &nbsp; $" + subTotal;
        newDiv.appendChild(subTotalElement);
    }
    
    // vat element create
    const vat = subTotal * 0.1
    vatElement();
    function vatElement() {
        const vatElement = document.createElement('h2');
        vatElement.innerHTML = "Vat &nbsp; &nbsp; = &nbsp; &nbsp; $" + vat;
        newDiv.appendChild(vatElement);
    }
   
    //  horizontal element create
    horizontalElement();

    // total element create
    const total = subTotal + vat;
    totalElement();
    function totalElement() {
        const totalElement = document.createElement('h2');
        totalElement.innerHTML = "Total &nbsp; &nbsp; = &nbsp; &nbsp; $" + total;
        newDiv.appendChild(totalElement);
    }
    

    //checkout element create
    function checkout() {
        const checkoutElement = document.createElement('input');
        checkoutElement.setAttribute('type','submit');
        checkoutElement.setAttribute('value','Checkout');
        checkoutElement.style.cssText = "width: 150px; padding: 10px; color: green; background-color: orange; font-size: 25px; cursor: pointer; border: none; font-weight: bold; margin-top: 20px; border-radius: 8px;  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)";
        newDiv.appendChild(checkoutElement);
    }
    checkout();
    
}

