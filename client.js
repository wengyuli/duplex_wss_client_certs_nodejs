const https = require('https');
const http = require('http');
const url = require('url');
const fs = require('fs');
const WebSocket = require('ws');

const wss = new WebSocket(`wss://123.56.130.89:8081`, {
	cert: fs.readFileSync('fixtures/agent1-cert.pem'),
	key: fs.readFileSync('fixtures/agent1-key.pem'),
	rejectUnauthorized: false
});

wss.on('open', function open() {
	wss.send('hi , I am client.');
});

wss.on('message', function incoming(data) {
	console.log( 'Received server message => ' + data);
});


// openssl pkcs12 -export -out Cert.p12 -in agent1-cert.pem -inkey agent1-key.pem -passin pass:123456: -passout pass:123456