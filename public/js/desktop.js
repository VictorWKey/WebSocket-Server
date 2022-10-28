const lblDesktop = document.querySelector('h1');
const buttonAttend = document.querySelector('button');

const searchParams = new URLSearchParams( window.location.search ); // ULRSearchParams es un objeto que te permite usar ciertos metodos para jugar con los parametros y sus valores. window.location.search te devuelve del "?" en adelante de la url de la ventana actual

if( !searchParams.get('desktop') ) {    
    window.location = 'index.html'
    throw new Error('Desktop is required');
}

lblDesktop.innerHTML = searchParams.get('desktop');

const socket = io();

socket.on('connect', () => {
    buttonAttend.disabled = false;
})

socket.on('disconnect', () => {
    buttonAttend.disabled = true;
})

buttonAttend.addEventListener('click', () => {

    // socket.emit('attend-ticket', null);

})