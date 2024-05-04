import deepEqualInAnyOrder from "deep-equal-in-any-order";
import { describe, test } from "vitest";
import { expect } from "chai";
import { simulateGame, runStep, getNeighbors } from "../src/game.mjs";
const chai = require('chai');
chai.use(deepEqualInAnyOrder);
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

  test("Static pattern should stay the same", () => {
    let staticPattern  = [{x:1, y:1},{x:2, y:1},{x:1, y:2},{x:2, y:2}];
    expect(runStep(staticPattern)).to.eql(staticPattern);
  });
});



describe("Simulating", () => {
  test("Empty world", () => {
    expect(simulateGame([],1)).to.eql([]);
    expect(simulateGame([],10)).to.eql([]);
  });

  test("One Cell", () => {
    expect(simulateGame([testCell],1)).to.eql([]);
    expect(simulateGame([testCell],10)).to.eql([]);
    });

  test("Static Cells", () => {
    let staticPattern  = [{x:1, y:1},{x:2, y:1},{x:1, y:2},{x:2, y:2}];
    expect(simulateGame(staticPattern,1)).to.eql(staticPattern);
    expect(simulateGame(staticPattern,10)).to.eql(staticPattern);
    });
    
  test("Glider", () => {
    let gliderStarting  = [{x:1, y:0},{x:2, y:1},{x:0, y:2},{x:1, y:2}, {x:2, y:2}];
    let glider6  = [{x:3, y:2},{x:1, y:3},{x:3, y:3},{x:2, y:4}, {x:3, y:4}];
    expect(simulateGame(gliderStarting,6)).to.deep.equalInAnyOrder(glider6);
    });
    
  test("Blinker", () => {
    let blinkerEven  = [{x:1, y:0},{x:2, y:0},{x:3, y:0}];
    let blinkerOdd  = [{x:2, y:-1},{x:2, y:0},{x:2, y:1}];
    expect(simulateGame(blinkerEven,6)).to.deep.equalInAnyOrder(blinkerEven);
    expect(simulateGame(blinkerEven,99)).to.deep.equalInAnyOrder(blinkerOdd);
    }); 
  
});


