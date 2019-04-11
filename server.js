const https = require('https');
const http = require('http');
const url = require('url');
const fs = require('fs');


const WebSocket = require('ws');

const server = https.createServer({
	cert: fs.readFileSync('fixtures/certificate.pem'),
	ca: [fs.readFileSync('fixtures/ca1-cert.pem')],
	key: fs.readFileSync('fixtures/key.pem'),
	requestCert: true
});

let success = false;
const wss = new WebSocket.Server({
	verifyClient: (info) => {
		success = !!info.req.client.authorized;
		return true;
	},
	server
});

wss.on('connection', ws => {
	
	ws.on('message', message => {
		console.log(`Received client message => ${message}`)
	})
	ws.send(' hi, I am server!');
});

server.listen(8081, () => {
	console.log("server is listening...");
});