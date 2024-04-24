const fs = require('fs');
import { parseRLE, encodedDataToFile} from "./parsing.mjs";


export function main(filePath, iterations) {
  let fileContents;
  try {
    fileContents =  fs.readFileSync(filePath, 'utf8');
  } catch (error){
    throw new Error("Error reading a file");
  }

  let parsedContents = parseRLE(fileContents);
  let processedContents = encodedDataToFile(parsedContents);
  return processedContents;

}


