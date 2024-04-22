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
    return {comments: hashComments,
            header: fileHeader,
            encodedPattern : filePattern}
}



