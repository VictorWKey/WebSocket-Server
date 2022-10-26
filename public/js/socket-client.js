const socketOnline = document.getElementById('socketOnline');
const socketOffline = document.getElementById('socketOffline');

const txtInput = document.getElementById('txtInput');
const sendButton = document.getElementById('sendButton');

const socket = io(); // Ojito que al no poner nada como argumento, se toma por defecto el url main de la aplicacion, en cambio si le poniamos http://localhost:4000/ , heroku no detecta su url en el io() y da un error

socket.on('connect', () => {
    console.log('Socket client connected to socket server');

    socketOnline.style.display = '';
    socketOffline.style.display = 'none';
    
})

socket.on('disconnect', () => {
    console.log('Socket client disconnected from socket server');

    socketOnline.style.display = 'none';
    socketOffline.style.display = '';
})

sendButton.addEventListener('click', () => {
    const message = txtInput.value;

    const payload = {
        message
    }

    socket.emit('send-message', payload, (id) => {
        console.log('Callback that recieves the info from argument callback server', id); // Lo que hace este callback es que recibe info que se haya enviado en el "escucha" de este evento
    })
})

socket.on('send-message', payload => {
    console.log(payload);
})

