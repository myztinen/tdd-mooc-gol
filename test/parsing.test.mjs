import { describe, test } from "vitest";
import { expect } from "chai";
import { parseRLE, encodedDataToFile, 
  decodeRLEPattern, encodeRLEPattern,
  patternToCells, cellsToPattern,
  parseHeader, stringifyHeader} from "../src/parsing.mjs";


describe("Parsing test", () => {
  let testContents = "#N Block\n#C An extremely common 4-cell still life.\n#C www.conwaylife.com/wiki/index.php?title=Block\nx = 2, y = 2, rule = B3/S23\n2o$2o!";
  let noHeaderContent = "#N Block\n#C An extremely common 4-cell still life.\n#C www.conwaylife.com/wiki/index.php?title=Block\n2o$2o!";
  let gosperHeader = "#N Gosper glider gun\n#C www.conwaylife.com/wiki/index.php?title=Gosper_glider_gun\nx = 36, y = 9, rule = B3/S23\n24bo11b$22bobo11b$12b2o6b2o12b2o$11bo3bo4b2o12b2o$2o8bo5bo3b2o14b$2o8b\no3bob2o4bobo11b$10bo5bo7bo11b$11bo3bo20b$12b2o!";
  test("Can read file", () => {
    let parsedContents = parseRLE(testContents);
    expect(parsedContents.comments).to.equal("#N Block\n#C An extremely common 4-cell still life.\n#C www.conwaylife.com/wiki/index.php?title=Block\n");
    expect(parsedContents.header.x).to.equal(2);
    expect(parsedContents.header.y).to.equal(2);
    expect(parsedContents.header.rule).to.equal("B3/S23");
    expect(parsedContents.encodedPattern).to.equal("2o$2o!");
  });

  test("Parse pattern that spans more than one row", () => {
    let parsedContents = parseRLE(gosperHeader);
    expect(parsedContents.comments).to.equal("#N Gosper glider gun\n#C www.conwaylife.com/wiki/index.php?title=Gosper_glider_gun\n");
    expect(parsedContents.header.x).to.equal(36);
    expect(parsedContents.header.y).to.equal(9);
    expect(parsedContents.header.rule).to.equal("B3/S23");
    expect(parsedContents.encodedPattern).to.equal("24bo11b$22bobo11b$12b2o6b2o12b2o$11bo3bo4b2o12b2o$2o8bo5bo3b2o14b$2o8bo3bob2o4bobo11b$10bo5bo7bo11b$11bo3bo20b$12b2o!$2o!");
  });

  test("header is empty", () => {
    expect(() => parseRLE(noHeaderContent)).to.throw("Header is not found!");
  });


});

describe("Parsing test", () => {
  let testContents = "#N Block\n#C An extremely common 4-cell still life.\n#C www.conwaylife.com/wiki/index.php?title=Block\nx = 2, y = 2, rule = B3/S23\n2o$2o!"
  let encodedData = {comments: "#N Block\n#C An extremely common 4-cell still life.\n#C www.conwaylife.com/wiki/index.php?title=Block\n",
                     //header: "x = 2, y = 2, rule = B3/S23",
                     header: {x: 2, y: 2, rule:"B3/S23"},
                     encodedPattern : "2o$2o!"}

  test("header is empty", () => {
    expect(encodedDataToFile(encodedData)).to.equal(testContents);
  });

});


describe("file header test", () => {
  let headerString = "x = 2, y = 2, rule = B3/S23"
  let parsedHeader = {x: 2, y: 2, rule:"B3/S23"}
  test("parsing header", () => {
    expect(parseHeader(headerString)).to.eql(parsedHeader);
  });

  test("encoding header", () => {
    expect(stringifyHeader(parsedHeader)).to.eql(headerString);
  });

});

describe("Decoding test", () => {

  test("Simple block stays the same", () => {
    expect(decodeRLEPattern("2o$2o!")).to.equal("oo$oo!");
  });

  test("Repeated tags", () => {
    expect(decodeRLEPattern("1b1o1$1!")).to.equal("bo$!");
  });

  test("Repeated tags 2", () => {
    expect(decodeRLEPattern("2b2o3$!")).to.equal("bboo$$$!");
  });

  test("Empty string", () => {
    expect(decodeRLEPattern("")).to.equal("");
  });
});

describe("Encoding test", () => {

  test("Simple block stays the same", () => {
    expect(encodeRLEPattern("oo$oo!")).to.equal("2o$2o!");
  });

  test("Repeated tags", () => {
    expect(encodeRLEPattern("bboo$$$!")).to.equal("2b2o3$!");
  });

  test("Repeated tags", () => {
    expect(encodeRLEPattern("bbbooobbb$!")).to.equal("3b3o$!");
  });

  test("Empty string", () => {
    expect(encodeRLEPattern("")).to.equal("");
  });
});


describe("Pattern to cells test", () => {
  
  test("One live cell", () => {
    expect(patternToCells("o!")).to.eql([{x:0, y:0}]);
  });

  test("One dead cell", () => {
    expect(patternToCells("b!")).to.eql([]);
  });

  test("Row of cells", () => {
    expect(patternToCells("ooo$!")).to.eql([{x:0, y:0},
                                               {x:1, y:0},
                                               {x:2, y:0}]);
  });

  test("Column of cells", () => {
    expect(patternToCells("o$o$o$!")).to.eql([{x:0, y:0},
                                               {x:0, y:1},
                                               {x:0, y:2}]);
    expect(patternToCells("o$o$o!")).to.eql([{x:0, y:0},
                                               {x:0, y:1},
                                               {x:0, y:2}]);                                           
  });

  test("Simple block to cells", () => {
    expect(patternToCells("oo$oo!")).to.have.deep.members([{x:0, y:0},
                                               {x:0, y:1},
                                               {x:1, y:0},
                                               {x:1, y:1}]);
  });

  test("Empty pattern", () => {
    expect(patternToCells("")).to.eql([]);
  });
});

describe("Cells to pattern test", () => {
  
  test("Empty cells", () => {
    expect(cellsToPattern([])).to.eql({
                                       minX: 0,
                                       minY: 0,
                                       width: 0,
                                       height:0,
                                       pattern: "!"
                                      });
  });

  test("One cell", () => {
    expect(cellsToPattern([{x:0, y:0}])).to.eql({
                                       minX: 0,
                                       minY: 0,
                                       width: 1,
                                       height: 1,
                                       pattern: "o!"
                                      });
  });

  test("Row of cells", () => {
    let testCells = [{x:0, y:0},
                    {x:1, y:0},
                    {x:2, y:0}];
    expect(cellsToPattern(testCells)).to.eql({
                                       minX: 0,
                                       minY: 0,
                                       width: 3,
                                       height: 1,
                                       pattern: "ooo!"
                                      });
  });

  test("Column of cells", () => {
    let testCells = [{x:0, y:0},
                     {x:0, y:1},
                     {x:0, y:2}];
    expect(cellsToPattern(testCells)).to.eql({
                                       minX: 0,
                                       minY: 0,
                                       width: 1,
                                       height: 3,
                                       pattern: "o$o$o!"
                                      });
  });

  test("Diagonal of cells", () => {
    let testCells = [{x:0, y:0},
                     {x:1, y:1},
                     {x:2, y:2}];
    expect(cellsToPattern(testCells)).to.eql({
                                       minX: 0,
                                       minY: 0,
                                       width: 3,
                                       height: 3,
                                       pattern: "obb$bob$bbo!"
                                      });
  });
});