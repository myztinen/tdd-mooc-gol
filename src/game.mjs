import { forEach } from "lodash";

export function simulateGame(startingCells, iterations) {
  return;

}

export function runStep(aliveCells) {
  // calculate whether alive cells survive
  let aliveCellsAfterStep= [];
  let allNeighboringCells = [];
  aliveCells.forEach(cell => {
    let neigboringCells = getNeighbors(cell);
    let neighborCount = countNeigbors(neigboringCells, aliveCells);
    if (neighborCount == 2 || neighborCount == 3) {
      aliveCellsAfterStep.push(cell); 
    }
  })
  //add all neighboring cells to now array
  aliveCells.forEach(cell => {
    let neighboringCells = getNeighbors(cell);
    neighboringCells.forEach(neighboringCell => {
      if (!coordinateIsInArray(allNeighboringCells,neighboringCell)) {
        allNeighboringCells.push(neighboringCell); 
      }
    })

  })
  //check if items in array have exactly 3 neighbors
  allNeighboringCells.forEach(cell => {
    let neighboringCells = getNeighbors(cell);
    let neighborCount = countNeigbors(neighboringCells, aliveCells);
    if (neighborCount == 3 && !coordinateIsInArray(aliveCellsAfterStep,cell)) {
      aliveCellsAfterStep.push(cell); 
    }
  })
    return aliveCellsAfterStep;
}

export function getNeighbors(coordinate) {
  const surroundindCells = [
    {x:-1, y:-1},{x:0, y:-1},{x:1, y:-1},
    {x:-1, y:0},{x:1, y:0},
    {x:-1, y:1},{x:0, y:1},{x:1, y:1}
  ]

  let neigbors = surroundindCells.map( cell => ({
    x: coordinate.x + cell.x,
    y: coordinate.y + cell.y
  }));
  return neigbors;
}

export function coordinateIsInArray(cells, coordinate) {
  for (let item of cells) {
    if(item.x == coordinate.x && item.y == coordinate.y) {
      return true;
    }
  }
  return false;
}

function countNeigbors(neigboringCells, currenAliveCells) {
  let count = 0;
  neigboringCells.forEach (coordinate => {
    currenAliveCells.forEach(aliveCoordinate => {
      if (coordinate.x == aliveCoordinate.x && coordinate.y == aliveCoordinate.y) {
        count++;
      }
    })
  })
  return count;
}
