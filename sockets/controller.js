

const socketServerConnection = (socket) =>{
    console.log('Connected', socket.id);

    socket.on('disconnect', () =>{
        // console.log('disconnected', socket.id);
    })

    socket.on('send-message', (payload, callback) => {

        const id = 123456;

        // this.io.emit('send-message', payload); // Este this.io suele utilizarse en casos muy especificos. Se usa en caso de que se requiera enviar un mensaje desde otros lugares del servidor, como por ejemplo una peticion REST
        // socket.emit('send-message', payload); // Lo que hara es que emitira un evento pero no todos los clientes lo van escuchar, solo lo escuchara el que lo emitio

        socket.broadcast.emit('send-message', payload); // Todos los clientes podran escuchar este "emit" debido al broadcast, excepto el cliente que haya "emitido" el evento padre de este

        callback({id}); // Lo que hace este parametro es enviarle algo al "emit" de este evento y lo recibe por medio de un callback

    })
}

module.exports = {
    socketServerConnection
}