const fs = require('fs');
import { parseRLE, encodedDataToFile, decodeRLEPattern,
  encodeRLEPattern, cellsToPattern, patternToCells } from "./parsing.mjs";
import { simulateGame } from "./game.mjs";

export function main(filePath, iterations) {
  let fileContents;
  try {
    fileContents =  fs.readFileSync(filePath, 'utf8');
  } catch (error){
    throw new Error("Error reading a file");
  }

  let parsedContents = parseRLE(fileContents);
  let decodedPattern = decodeRLEPattern(parsedContents.encodedPattern);
  let startingCells = patternToCells(decodeRLEPattern);
  let endingCells = simulateGame(startingCells, iterations);
  //let endingPattern = cellsToPattern(endingCells);
  let encodedDataPattern = encodeRLEPattern(decodedPattern);
  let newFileContents = {comments: parsedContents.comments,
                      header: parsedContents.header,
                      encodedPattern : encodedDataPattern}
  let processedContents = encodedDataToFile(newFileContents);
  return processedContents;

}


