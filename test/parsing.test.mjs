import { describe, test } from "vitest";
import { expect } from "chai";
import { parseRLE, encodedDataToFile, decodeRLEPattern, encodeRLEPattern } from "../src/parsing.mjs";


describe("Parsing test", () => {
  let testContents = "#N Block\n#C An extremely common 4-cell still life.\n#C www.conwaylife.com/wiki/index.php?title=Block\nx = 2, y = 2, rule = B3/S23\n2o$2o!";
  let noHeaderContent = "#N Block\n#C An extremely common 4-cell still life.\n#C www.conwaylife.com/wiki/index.php?title=Block\n2o$2o!";

  test("Can read file", () => {
    let parsedContents = parseRLE(testContents);
    expect(parsedContents.comments).to.equal("#N Block\n#C An extremely common 4-cell still life.\n#C www.conwaylife.com/wiki/index.php?title=Block\n");
    expect(parsedContents.header).to.equal("x = 2, y = 2, rule = B3/S23");
    expect(parsedContents.encodedPattern).to.equal("2o$2o!");
  });

  test("header is empty", () => {
    expect(() => parseRLE(noHeaderContent)).to.throw("Header is not found!");
  });

});

describe("Parsing test", () => {
  let testContents = "#N Block\n#C An extremely common 4-cell still life.\n#C www.conwaylife.com/wiki/index.php?title=Block\nx = 2, y = 2, rule = B3/S23\n2o$2o!"
  let encodedData = {comments: "#N Block\n#C An extremely common 4-cell still life.\n#C www.conwaylife.com/wiki/index.php?title=Block\n",
                     header: "x = 2, y = 2, rule = B3/S23",
                     encodedPattern : "2o$2o!"}

  test("header is empty", () => {
    expect(encodedDataToFile(encodedData)).to.equal(testContents);
  });

});

describe("Deconding test", () => {

  test("Simple block stays the same", () => {
    expect(decodeRLEPattern("2o$2o!")).to.equal("oo$oo!");
  });

  test("Repeated tags", () => {
    expect(decodeRLEPattern("1b1o1$1!")).to.equal("bo$!");
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
    expect(encodeRLEPattern("bo$!")).to.equal("1b1o1$1!");
  });

  test("Empty string", () => {
    expect(encodeRLEPattern("")).to.equal("");
  });


});


