export function parseRLE(fileContents) {
  let hashComments= '';
  let fileHeader, filePattern;

    let rows = fileContents.split('\n');

    rows.forEach(row => {
      let letter = row[0];
      if(letter == '#') hashComments +=row.trim() + '\n';
      if (letter == 'x') fileHeader = row.trim();
      else filePattern = row;
    })

    if(fileHeader == undefined) throw new Error("Header is not found!");
    return {comments: hashComments,
            header: fileHeader,
            encodedPattern : filePattern}
}

export function encodedDataToFile(data) {
  let newContents = '';
  newContents += data.comments.trim() + '\n';
  newContents += data.header.trim() + '\n';
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
  return ;
}


export function cellsToPattern(data) {
  return ;
}

