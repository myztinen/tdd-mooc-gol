const fs = require('fs');


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
    if(fileHeader == undefined) throw new Error("No header!!");
    return {comments: hashComments,
            header: fileHeader,
            encodedPattern : filePattern}
}


export function main(filePath, iterations) {
  let fileContents;
  try {
    fileContents =  fs.readFileSync(filePath, 'utf8');
  } catch (error){
    throw new Error("Error reading a file");
  }
  return parseRLE(fileContents);

}


