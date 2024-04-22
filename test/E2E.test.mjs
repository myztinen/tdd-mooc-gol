import { describe, test } from "vitest";
import { expect } from "chai";
import { main } from "../src/main.mjs";
import { parseRLE } from "../src/parsing.mjs";



describe("First test", () => {
  test("Can read file", () => {
    let fileContents = main("./resourses/block.rle");
    expect(fileContents.comments).to.equal("#N Block\n#C An extremely common 4-cell still life.\n#C www.conwaylife.com/wiki/index.php?title=Block\n");
    expect(fileContents.header).to.equal("x = 2, y = 2, rule = B3/S23");
    expect(fileContents.encodedPattern).to.equal("2o$2o!");
  });
});
