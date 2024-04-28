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
    let count = match[1] === '' ? 1 : parseInt(match[1]);
    let letter = match[2];

    if (letter == 'o' || letter == 'b') {
      decodedPattern += letter.repeat(count);
    } else if(letter == '$') {
      decodedPattern += '$';
    } else if(letter == '!') {
      decodedPattern += '!';
    }
  }
  return decodedPattern;
}

export function encodeRLEPattern(decodedPattern) {

  return decodedPattern;
}