import { describe, test } from "vitest";
import { expect } from "chai";
import { main } from "../src/main.mjs";



describe("First test", () => {
  test("Can read file", () => {
    let testContents = "#N Block\n#C An extremely common 4-cell still life.\n#C www.conwaylife.com/wiki/index.php?title=Block\nx = 2, y = 2, rule = B3/S23\n2o$2o!";
    let fileContents = main("./resourses/block.rle", 0);
    expect(fileContents).to.equal(testContents);
  });

  test("Glider for one step", () => {
    let testContents = "#N Glider\n#O Richard K. Guy\n#C The smallest, most common, and first discovered spaceship. Diagonal, has period 4 and speed c/4.\n#C www.conwaylife.com/wiki/index.php?title=Glider\nx = 3, y = 3, rule = B3/S23\nobo$b2o$bo!";
    let fileContents = main("./resourses/glider.rle", 1);
    expect(fileContents).to.equal(testContents);
  });

  test("Glider for ten steps", () => {
    let testContents = "#N Glider\n#O Richard K. Guy\n#C The smallest, most common, and first discovered spaceship. Diagonal, has period 4 and speed c/4.\n#C www.conwaylife.com/wiki/index.php?title=Glider\nx = 3, y = 3, rule = B3/S23\n2bo$obo$b2o!";
    let fileContents = main("./resourses/glider.rle", 10);
    expect(fileContents).to.equal(testContents);
  });

  test("Glider for ten steps with split input", () => {
    let testContents = "#N Glider\n#O Richard K. Guy\n#C The smallest, most common, and first discovered spaceship. Diagonal, has period 4 and speed c/4.\n#C www.conwaylife.com/wiki/index.php?title=Glider\nx = 3, y = 3, rule = B3/S23\n2bo$obo$b2o!";
    let fileContents = main("./resourses/glider_split.rle", 10);
    expect(fileContents).to.equal(testContents);
  });


  test("Herschel for 20 steps", () => {
    let testContents = "#N Herschel\n#C www.conwaylife.com/wiki/index.php?title=Herschel\nx = 8, y = 6, rule = B3/S23\n5bo$3b2ob2o$5o$o2bo$o2bo$b2o!";
    let fileContents = main("./resourses/herschel.rle", 20);
    expect(fileContents).to.equal(testContents);
  });

  test("Gosper gun for 1 steps", () => {
    let testContents = "#N Gosper glider gun\n#C www.conwaylife.com/wiki/index.php?title=Gosper_glider_gun\nx = 36, y = 9, rule = B3/S23\n23bo$21bobo$12bo7bobo11b2o$11b2o6bo2bo11b2o$2o8b2o4b2o2bobo$2o7b3o4b2o\n3bobo$10b2o4b2o5bo$11b2o$12bo!";
    let fileContents = main("./resourses/gosper.rle", 1);
    expect(fileContents).to.equal(testContents);
  });


  test("Gosper gun for 30 steps", () => {
    let testContents = "#N Gosper glider gun\n#C www.conwaylife.com/wiki/index.php?title=Gosper_glider_gun\nx = 36, y = 12, rule = B3/S23\n24bo$22bobo$12b2o6b2o12b2o$11bo3bo4b2o12b2o$2o8bo5bo3b2o$2o8bo3bob2o4b\nobo$10bo5bo7bo$11bo3bo$12b2o$23bo$24b2o$23b2o!";
    let fileContents = main("./resourses/gosper.rle", 30);
    expect(fileContents).to.equal(testContents);
  });

  test("Empty file throws error", () => {
    expect(() => main("")).to.throw("Error reading a file");
  });
});


