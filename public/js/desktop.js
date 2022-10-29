const lblDesktop = document.querySelector('h1');
const buttonAttend = document.querySelector('button');
const divAlert = document.querySelector('.alert');
const lblAttend = document.querySelector('small');
const lblPendant = document.querySelector('#lblPendant');

divAlert.style.display = 'none';

const searchParams = new URLSearchParams( window.location.search ); // ULRSearchParams es un objeto que te permite usar ciertos metodos para jugar con los parametros y sus valores. window.location.search te devuelve del "?" en adelante de la url de la ventana actual

if( !searchParams.get('desktop') ) {    
    window.location = 'index.html'
    throw new Error('Desktop is required');
}

const desktop = searchParams.get('desktop');

lblDesktop.innerHTML = desktop;

const socket = io();

socket.on('pendant-tickets', ( pendantsTickets ) => {
    // lblPendant.innerText = pendantsTickets;

    if ( pendantsTickets === 0 ) {
        lblPendant.style.display = 'none';
    } else {
        lblPendant.style.display = '';
        lblPendant.innerText = pendantsTickets;
        divAlert.style.display = 'none';
    }
    
})

socket.on('connect', () => {
    buttonAttend.disabled = false;
})

socket.on('disconnect', () => {
    buttonAttend.disabled = true;
})

buttonAttend.addEventListener('click', () => {


    socket.emit('attend-ticket', { desktop }, ({ok, ticket}) => {

        if( !ok ) {
            lblAttend.innerText = 'Anyone';
            divAlert.style.display = '';
        } else {
            lblAttend.innerText = 'ticket ' + ticket.number;
            divAlert.style.display = 'none';
        }

    });

})