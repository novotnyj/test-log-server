import fs from 'fs';

export const createFileIfNotExists = (path: string) => {
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
