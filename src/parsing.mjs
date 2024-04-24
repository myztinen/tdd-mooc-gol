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


