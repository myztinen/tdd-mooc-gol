import { describe, test } from "vitest";
import { expect } from "chai";
import { main } from "../src/main.mjs";
import { parseRLE } from "../src/parsing.mjs";



describe("First test", () => {
  test("Can read file", () => {
    let testContents = "#N Block\n#C An extremely common 4-cell still life.\n#C www.conwaylife.com/wiki/index.php?title=Block\nx = 2, y = 2, rule = B3/S23\n2o$2o!";
    let fileContents = main("./resourses/block.rle", 0);
    expect(fileContents).to.equal(testContents);
  });

  test("Empty file throws error", () => {
    expect(() => main("")).to.throw("Error reading a file");
  });

});
