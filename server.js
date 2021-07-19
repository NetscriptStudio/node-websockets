'use strict';

const express = require('express');
const { Server } = require('ws');

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new Server({ server });

var data = {}

wss.on('connection', (ws) => {
	console.log('Client connected');

  	ws.client.send(JSON.stringify(data));

	ws.on('message', (msg) => {
		console.log(JSON.parse(msg));
    		var mess = JSON.parse(msg);

    		data[mess.gameName][mess.name] = mess
    		wss.clients.forEach((client) => {

      		client.send(JSON.stringify(data));
    		})
	});
});
