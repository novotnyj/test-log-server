import express, { 
    Express, 
    Request, 
    Response,
} from 'express';
import fs from 'fs';
import { TcpServer } from './TcpServer';
import { createFileIfNotExists } from './helpers';

const DEFAULT_PORT = 3000;
const DEFAULT_TCP_PORT = '9001';

const app: Express = express();
const port = process.env.PORT || DEFAULT_PORT;
const logFilePath = process.env.LOG_PATH || './logs/requests.txt';

const server = new TcpServer(process.env.TCP_PORT || DEFAULT_TCP_PORT, logFilePath);
server.start();

createFileIfNotExists(logFilePath);

const logRequest = async (req: Request) => {
    // Saves request body and params to a file located in ./logs/requests.txt
    const { body, query } = req;
    const request = {
        body,
        query,
    };
    const requestString = `${(new Date()).toISOString()} [${req.method}]: ${JSON.stringify(request)}`;
    console.log(requestString);
    fs.appendFile(logFilePath, `${requestString}\n`, (err) => {
        console.log(err);
    });
};

const respondOk = async(res: Response) => {
    res.send('OK');
}

app.get('/', (req: Request, res: Response) => {
  void logRequest(req);
  void respondOk(res);
});

app.post('/', (req: Request, res: Response) => {
    void logRequest(req);
    void respondOk(res);
});

app.put('/', (req: Request, res: Response) => {
    void logRequest(req);
    void respondOk(res);
});


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
