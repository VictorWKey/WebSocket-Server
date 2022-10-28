const express = require('express');
const cors = require('cors');
const { socketServerConnection } = require('../sockets/controller');


class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        this.paths = {}

        //Database connection

        //Middlewares
        this.middlewares();
        
        //Routes of my application
        this.routes();

        // Sockets 
        this.sockets();
    }

    middlewares(){

        //Cors
        this.app.use(cors());

        // Public directory
        this.app.use(express.static('public'));
    }

    routes(){}

    sockets() {
        this.io.on('connection', socketServerConnection)
    }

    listen(){
        this.server.listen(this.port, () => {
            console.log('Server running in port: ' + this.port)
        });        
    }




}

module.exports = Server;