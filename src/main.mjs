const fs = require('fs');
import { parseRLE, encodedDataToFile, decodeRLEPattern,
  encodeRLEPattern} from "./parsing.mjs";


export function main(filePath, iterations) {
  let fileContents;
  try {
    fileContents =  fs.readFileSync(filePath, 'utf8');
  } catch (error){
    throw new Error("Error reading a file");
  }

  let parsedContents = parseRLE(fileContents);
  let decodedPattern = decodeRLEPattern(parsedContents.encodedPattern);
  let encodedDataPattern = encodeRLEPattern(decodedPattern);
  let processedContents = encodedDataToFile(parsedContents);
  return processedContents;

}


