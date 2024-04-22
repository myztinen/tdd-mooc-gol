import { describe, test } from "vitest";
import { expect } from "chai";
import { parseRLE } from "../src/parsing.mjs";


describe("Parsing test", () => {
  let testContents = "#N Block\n#C An extremely common 4-cell still life.\n#C www.conwaylife.com/wiki/index.php?title=Block\nx = 2, y = 2, rule = B3/S23\n2o$2o!"
  test("Can read file", () => {
    let parsedContents = parseRLE(testContents);
    expect(parsedContents.comments).to.equal("#N Block\n#C An extremely common 4-cell still life.\n#C www.conwaylife.com/wiki/index.php?title=Block\n");
    expect(parsedContents.header).to.equal("x = 2, y = 2, rule = B3/S23");
    expect(parsedContents.encodedPattern).to.equal("2o$2o!");
  });

});
