//----------
const TicketControl = require("../models/ticket-control");
const ticketControl = new TicketControl();
//----------

const socketServerConnection = (socket) =>{

    socket.emit('last-ticket', ticketControl.last);

    socket.emit('show-last-tickets', ticketControl.last4);

    socket.emit('pendant-tickets', ticketControl.tickets.length );


    socket.on('new-ticket', (payload, callback) => {

        // this.io.emit('send-message', payload); // Este this.io suele utilizarse en casos muy especificos. Se usa en caso de que se requiera enviar un mensaje desde otros lugares del servidor, como por ejemplo una peticion REST
        // socket.emit('send-message', payload); // Lo que hara es que emitira un evento pero no todos los clientes lo van escuchar, solo lo escuchara el que lo emitio
        // socket.broadcast.emit('send-message', payload); // Todos los clientes podran escuchar este "emit" debido al broadcast, excepto el cliente que haya "emitido" el evento padre de este

        const generate = ticketControl.generateTicket();
        
        socket.broadcast.emit('pendant-tickets', ticketControl.tickets.length );

        callback(generate); // Lo que hace este parametro es enviarle algo al "emit" de este evento y lo recibe por medio de un callback

    })

    socket.on('attend-ticket', ( { desktop }, callback ) => {

        if (!desktop) {
            return callback({
                ok: false,
                msg: 'Desktop is required'
            }) 
        }

        const ticket = ticketControl.attendTicket( desktop );

        socket.broadcast.emit('show-last-tickets', ticketControl.last4);
        socket.broadcast.emit('pendant-tickets', ticketControl.tickets.length );
        socket.emit('pendant-tickets', ticketControl.tickets.length );

        if ( !ticket ) {
            return callback({
                ok: false,
                msg: 'No more tickets to attend'
            })
        } else {
            return callback({
                ok: true,
                ticket
            })
        }


    }) 
}

module.exports = {
    socketServerConnection
}