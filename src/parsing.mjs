import { result } from "lodash";
import { coordinateIsInArray } from "./game.mjs";


export function parseRLE(fileContents) {
  let hashComments= '';
  let fileHeader, filePattern;

    let rows = fileContents.split('\n');

    rows.forEach(row => {
      let letter = row[0];
      if(letter == '#') hashComments +=row.trim() + '\n';
      if (letter == 'x') fileHeader = parseHeader(row.trim());
      else filePattern = row;
    })

    if(fileHeader == undefined) throw new Error("Header is not found!");
    return {comments: hashComments,
            header: fileHeader,
            encodedPattern : filePattern}
}

export function parseHeader(header) {
  let parts = header.split(',');
  let parsedHeader = {};

  parts.forEach( part => {
    let [key,value] = part.split('=').map(item => item.trim());
    
    parsedHeader[key] = isNaN(value) ? value : Number(value);
  });
  return parsedHeader;
}

export function stringifyHeader(header) {
  let parts = Object.entries(header).map(([key, value]) => `${key} = ${value}`);
  return parts.join(', ');
}

export function encodedDataToFile(data) {
  let newContents = '';
  newContents += data.comments.trim() + '\n';
  newContents += stringifyHeader(data.header) + '\n';
  newContents += data.encodedPattern.trim();
  return newContents;
}

export function decodeRLEPattern(encodedPattern) {
  let decodedPattern = '';
  const patterRegexp = /(\d)?([ob$!])/g;
  let match;


  while((match = patterRegexp.exec(encodedPattern)) != null ) {
    let count = (match[1] === '' || match[1] === undefined) ? 1 : parseInt(match[1]);
    let letter = match[2];

    if (letter == 'o' || letter == 'b' || letter == '$' ) {
      decodedPattern += letter.repeat(count);

    } else if(letter == '!') {
      decodedPattern += '!';
    }
  }
  return decodedPattern;
}

export function encodeRLEPattern(decodedPattern) {
  let encodedPattern = '';
  let part = '';
  let count = 1;
  for(let i = 0; i< decodedPattern.length; i++ ) {
    part = decodedPattern[i]
    if (decodedPattern[i] == decodedPattern[i+1]) {
      count++;
    } else {
      if(decodedPattern[i] == 'b' && (decodedPattern[i+1] == '$' || decodedPattern[i+1] == '!')) {
      
      } else {
        encodedPattern += (count > 1 ? count : '') + decodedPattern[i];
      }
        count = 1;
    
    }
  }
  return encodedPattern;
}


export function patternToCells(data) {
  let patternX = 0;
  let patternY = 0;
  let cells = [];
  for(let i =0; i< data.length; i++) {
    if(data[i] == 'b') {
      patternX++;
      continue; 
    } 
    if(data[i] == 'o') {
      cells.push({x:patternX, y:patternY});
      patternX++;
    }
    if(data[i] == '$') {
      patternY++;
      patternX=0;
    }
    if(data[i] == '!') {
      break;
    }
  } 
  return cells;
}


export function cellsToPattern(data) {
  let minX=data.length == 0 ? 0 : 9999999999;
  let minY=data.length == 0 ? 0 : 9999999999;
  let maxY=0;
  let width=0;
  let height=0;
  let maxX=0;
  let patternString=data.length == 0 ? '!' : '';

  if(data.length > 0) {
    data.sort((a,b) => {
      if(a.y != b.y) {
        return a.y - b.y;
      } else 
        return a.x - b.x});

    minY = data[0].y;
    maxY = data[data.length-1].y;
    minX = data.reduce((smallestX, current) => {
      return Math.min(smallestX, current.x);
    }, minX);
    maxX = data.reduce((largestX, current) => {
      return Math.max(largestX, current.x);
    }, maxX);
    width = data.length == 0 ? 0 : (maxX - minX)+1;
    height = data.length == 0 ? 0 : (maxY - minY)+1;
    for(let i = minY; i<= maxY; i++) {
      for(let j = minX; j<= maxX; j++) {
        if (coordinateIsInArray(data, {x:j, y:i}))  {
          patternString += 'o';

        }
        else patternString += 'b'
      }
      patternString += '$';
    }
    patternString = patternString.replace(/.$/, "") +'!';
  }
  return {
    minX: minX,
    minY: minY,
    width: width,
    height: height,
    pattern: patternString
   };
}

