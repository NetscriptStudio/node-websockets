'use strict';

const http = require("http")
const websocketServer = require("ws")
const httpServer = http.createServer()

const PORT = process.env.PORT || 3000;

const WebSocket = require('ws');
const wsServer = new WebSocket.Server({
    port: PORT
});

var messages = []

wsServer.on('connection', function (socket) {
    console.log("A client just connected");

    // Attach some behavior to the incoming socket
    socket.on('message', function (msg) {
        console.log("Received message from client: "  + msg);

        // Broadcast that message to all connected clients
        messages.push(msg);
      
        wsServer.clients.forEach(function (client) {
            client.send(messages);
        });

    });

});
