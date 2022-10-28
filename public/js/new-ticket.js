
const lblNewTicket = document.querySelector('#lblNewTicket');
const newTicketButton = document.querySelector('button');


const socket = io();

socket.on('connect', () => {
    newTicketButton.disabled = false;
})

socket.on('disconnect', () => {
    newTicketButton.disabled = true;
})

socket.on('last-ticket', (lastTicket) => {
    lblNewTicket.innerText = `Ticket ${lastTicket}`;
})

newTicketButton.addEventListener('click', () => {
    socket.emit('new-ticket', null, ( generate ) => {
        lblNewTicket.innerText = generate;
    })
});


