'use strict';

const express = require('express');
const { Server } = require('ws');

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new Server({ server });

wss.on('connection', (ws) => {
	console.log('A new client connected!');

	ws.on('message', (msg) => {

		console.log(JSON.parse(msg));
    		var mess = JSON.parse(msg);

    		wss.clients.forEach((client) => {

      			client.send(JSON.stringify(mess));
    			})
	  	});
});
