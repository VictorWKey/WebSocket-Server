const socketOnline = document.getElementById('socketOnline');
const socketOffline = document.getElementById('socketOffline');

const socket = io('http://localhost:8080/');

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

