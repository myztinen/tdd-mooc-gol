
export function simulateGame(startingCells, iterations) {
  return;

}

export function runStep() {

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

export function coordinateHasAliveCell(cells, coordinate) {
  for (let item of cells) {
    if(item.x == coordinate.x && item.y == coordinate.y) {
      return true;
    }
  }
  return false;
}
