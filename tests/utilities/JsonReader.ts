import * as fs from 'fs';
import * as path from 'path';

class JsonReader {
    private static readonly classLocation = 'tests/data/';
    private static readonly fileExtension = '.json';
    private static readonly greenBoldColor = '\x1b[32;1m';
    private static readonly resetColor = '\x1b[0m';
    private static readonly greenSuccessMessage = `${JsonReader.greenBoldColor}Success! ${JsonReader.resetColor}`;

    private static filePath: string;
    private static jsonObject: any;

    /**
     * Sets the file path based on the provided file name.
     * @param fileName - The name of the file to set the path for.
     */
    public static setFilePath(fileName: string): void {
        const projectLocation = process.cwd();
        this.filePath = path.join(projectLocation, this.classLocation, `${fileName}${this.fileExtension}`);
        console.log('File Path:', this.filePath);
    }

    /**
     * Loads JSON content from the file.
     */
    private static loadJson(): void {
        try {
            const fileContent = fs.readFileSync(this.filePath, 'utf-8');
            this.jsonObject = JSON.parse(fileContent);
        } catch (error) {
            console.error('Error loading JSON:', error);
        }
    }

    /**
     * Retrieves a value from the JSON file based on the given key.
     * @param key - The key to search for in the JSON file.
     * @param fileName - The name of the JSON file to read from.
     * @returns The value associated with the key, or an error message if the key is not found.
     */
    public static getValueFromJsonFile(key: string, fileName: string): string {
        this.setFilePath(fileName);
        this.loadJson();

        if (!this.jsonObject) {
            console.error('Error: JSON object is undefined. Please check if the file was loaded correctly.');
            return `Failed to load JSON file: ${fileName}`;
        }

        const value = this.jsonObject[key];
        console.log(`Getting the value of ${key}...`);
        if (value !== undefined) {
            console.log(`${this.greenSuccessMessage} Successfully got the key '${key}' value`);
            return value.toString();
        } else {
            return `Cannot find the key '${key}' in the JSON file.`;
        }
    }

    /**
     * Updates a value in the JSON file based on the given key and value.
     * @param key - The key to update in the JSON file.
     * @param value - The new value to set for the key.
     * @param fileName - The name of the JSON file to update.
     */
    public static updateValueInJsonFile(key: string, value: any, fileName: string): void {
        this.setFilePath(fileName);
        this.loadJson();
        this.jsonObject[key] = value;
        this.saveChanges();
        console.log(`${this.greenSuccessMessage} Successfully updated the key '${key}' value to '${value}'`);
        this.formatJsonFile(this.filePath);
    }

    /**
     * Saves changes to the JSON file.
     */
    private static saveChanges(): void {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(this.jsonObject, null, 2), 'utf-8');
        } catch (error) {
            console.error('Error saving JSON:', error);
        }
    }

    /**
     * Formats the JSON file to be human-readable.
     * @param filePath - The path to the JSON file to format.
     */
    public static formatJsonFile(filePath: string): void {
        try {
            const jsonContent = fs.readFileSync(filePath, 'utf-8');
            const jsonObject = JSON.parse(jsonContent);
            const formattedJson = JSON.stringify(jsonObject, null, 2);
            fs.writeFileSync(filePath, formattedJson, 'utf-8');
        } catch (error) {
            console.error('Error formatting JSON file:', error);
        }
    }
}

export default JsonReader;
