import net from 'net';

const host = 'cluster0.6rlcjvr.mongodb.net';
const port = 27017;

console.log(`Connecting to ${host}:${port}...`);

const socket = new net.Socket();
socket.setTimeout(5000);

socket.on('connect', () => {
    console.log('✅ Port 27017 is OPEN / Reachable!');
    socket.destroy();
    process.exit(0);
});

socket.on('timeout', () => {
    console.log('❌ Connection TIMEOUT');
    socket.destroy();
    process.exit(1);
});

socket.on('error', (err) => {
    console.log('❌ Connection ERROR:', err.message);
    process.exit(1);
});

socket.connect(port, host);
