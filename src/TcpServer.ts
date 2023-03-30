import net from 'net';
import fs from 'fs';

export class TcpServer {
    private server: net.Server;
    private port: string;
    private logFilePath: string;

    constructor(port: string, logFilePath: string) {
        this.port = port;
        this.logFilePath = logFilePath;
        this.server = net.createServer();
        this.server.on('connection', (socket: net.Socket) => this.handleConnection(socket));
    }

    handleConnection(socket: net.Socket) {
        const remoteAddress = socket.remoteAddress + ':' + socket.remotePort;  
        console.log('New TCP client connection from %s', remoteAddress);

        socket.on('data', (data: Buffer) => {
            console.log('Data from %s: %j', remoteAddress, data);
            const line = `${(new Date()).toISOString()}: [TCP] ${data.toString()}\n`;
            fs.appendFile(this.logFilePath, line, (err) => {
                console.log(err);
            });
        });

        socket.once('close', () => {
            console.log('Connection from %s closed', remoteAddress);
        });

        socket.on('error', (err: Error) => {
            console.log('Connection %s error: %s', remoteAddress, err.message);
        });
    }

    start() {
        this.server.listen(this.port, () => {    
            console.log('TCP server listening to %j', this.server.address());  
        });
    }
}
