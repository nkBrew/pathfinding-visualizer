import { NodeType } from '../PathfindingVisualizer/Grid/Node/Node';
import { ColRow, equals } from './algorithms';

export type DijkstraNode = {
  dist: number;
  previous: DijkstraNode | null;
  explored: boolean;
} & ColRow;

const map2dTo1d = (row: number, col: number, nCol: number): number => {
  return row * nCol + col;
};

export const dijkstra = (
  start: ColRow,
  goal: ColRow,
  grid: NodeType[][],
  numRow: number,
  numCol: number,
): ColRow[][] => {
  const unexplored: DijkstraNode[] = [];
  for (let row = 0; row < numRow; row++) {
    for (let col = 0; col < numCol; col++) {
      const v: DijkstraNode = { dist: Infinity, previous: null, row: row, col: col, explored: false };
      if (v.row == start.row && v.col == start.col) {
        v.dist = 0;
      }
      unexplored.push(v);
    }
  }

  const explored: DijkstraNode[] = [];

  while (unexplored.some((node) => !node.explored)) {
    const firstUnexploredNode = unexplored.find((node) => !node.explored && !grid[node.row][node.col].isWall);

    //Stops infinite loop
    if (firstUnexploredNode == undefined) {
      return [explored, []];
    }
    let currentNode = firstUnexploredNode;
    unexplored
      .filter((node) => !node.explored)
      .forEach((node) => {
        if (node.dist < currentNode.dist) {
          currentNode = node;
        }
      });

    //If trapped by a wall.
    if (currentNode.dist == Infinity) {
      return [explored, []];
    }

    currentNode.explored = true;
    explored.push(currentNode);

    if (equals(currentNode, goal)) {
      const traceback = [];
      let tracenode: DijkstraNode | null = currentNode;
      while (tracenode != null) {
        traceback.push(tracenode);
        tracenode = tracenode.previous;
      }
      return [explored, traceback];
    }

    const prospectivePositions = [
      { col: currentNode.col + 1, row: currentNode.row },
      { col: currentNode.col - 1, row: currentNode.row },
      { col: currentNode.col, row: currentNode.row + 1 },
      { col: currentNode.col, row: currentNode.row - 1 },
    ];
    const validNearbyPositions = prospectivePositions.filter(
      (pos) => pos.col >= 0 && pos.col < numCol && pos.row >= 0 && pos.row < numRow && !grid[pos.row][pos.col].isWall,
    );

    validNearbyPositions.forEach((pos) => {
      const node = unexplored[map2dTo1d(pos.row, pos.col, numCol)];
      const newDistance = currentNode.dist + 1;
      if (newDistance < node.dist) {
        node.dist = newDistance;
        node.previous = currentNode;
      }
    });
  }

  return [];
};
