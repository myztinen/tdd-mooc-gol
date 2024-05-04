import { describe, test } from "vitest";
import { expect } from "chai";
import { simulateGame, runStep, getNeighbors } from "../src/game.mjs";

let testCell = {x:3, y:7};
let neigboringCells= [{x:2, y:6},
  {x:3, y:6},
  {x:4, y:6},
  {x:2, y:7},
  {x:4, y:7},
  {x:2, y:8},
  {x:3, y:8},
  {x:4, y:8}
];


describe("Cell with n neigbors", () => {
  test("Neighbors can be calculated", () => {
  expect(getNeighbors(testCell)).to.eql(neigboringCells);
  });

  test("No cells at all", () => {
  expect(runStep([])).to.eql([]);

  });

  test("Cell with 1 neighbor", () => {
    expect(runStep([testCell])).to.eql([]);
  });


  test("Cell with 2 neighbors", () => {
    let cells = [  {x:2, y:6}, testCell, {x:4, y:6},];
    expect(runStep(cells)).to.eql([testCell, {x:3, y:6}]);
  });

  test("Cell with 3 neighbors", () => {
    let cells = [  {x:2, y:6}, {x:3, y:6}, {x:4, y:6}, testCell];
    let actualResult = [{x:2, y:6}, {x:3, y:6}, {x:4, y:6}, testCell, {x:3, y:5},{x:2, y:7}, {x:4, y:7}]
    expect(runStep(cells)).to.eql(actualResult);
  });

  test("TestCell with 4 neighbors dies due to overpopulation", () => {
    let cells = [  {x:2, y:6}, {x:3, y:6}, {x:4, y:6}, testCell, {x:3, y:8}];
    expect(runStep(cells)).to.not.include(testCell);
  });

  test("New cell is formed when dead cell has exactly 3 neighbors", () => {
    let cells = [  {x:2, y:6},  {x:4, y:6},  {x:3, y:8}];
    expect(runStep(cells)).to.eql([testCell]);
  });
});
