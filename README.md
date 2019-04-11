# duplex_wss_client_certs_nodejs
This demo show how to communicate between a client cert with node js websocket server


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

const wss = new WebSocket(`wss://localhost:8081`, {
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
