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
  let startingCells = patternToCells(decodedPattern);
  let endingCells = simulateGame(startingCells, iterations);
  let endingPattern = cellsToPattern(endingCells);
  console.log(endingPattern);
  let encodedDataPattern = encodeRLEPattern(endingPattern.pattern);
  let newHeader = {x: endingPattern.width, y:endingPattern.height, rule: parsedContents.header.rule};
  let newFileContents = {comments: parsedContents.comments,
                      header: newHeader,
                      encodedPattern : encodedDataPattern}
  let processedContents = encodedDataToFile(newFileContents);
  return processedContents;

}


