import express, { 
    Express, 
    Request, 
    Response,
} from 'express';
import fs from 'fs';

const DEFAULT_PORT = 3000;

const app: Express = express();
const port = process.env.PORT || DEFAULT_PORT;
const logFilePath = process.env.LOG_PATH || './logs/requests.txt';

const createFileIfNotExists = (path: string) => {
    // Check if file exists
    if (fs.existsSync(path)) {
        return;
    }
    // Extract directory path and file name
    const pathParts = path.split('/');
    const fileName = pathParts.pop();
    const directoryPath = pathParts.join('/');
    // Create directory if it doesn't exist
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath);
    }
    // Create file
    console.log(`Creating file ${fileName} in ${directoryPath}...`);
    fs.writeFileSync(path, '');
};

createFileIfNotExists(logFilePath);

const logRequest = async (req: Request) => {
    // Saves request body and params to a file located in ./logs/requests.txt
    const { body, query } = req;
    const request = {
        body,
        query,
    };
    const requestString = `${(new Date()).toISOString()} [${req.method}]: ${JSON.stringify(request)}\n`;
    fs.appendFile(logFilePath, requestString, (err) => {    
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
