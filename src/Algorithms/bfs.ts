import { NodeType } from '../PathfindingVisualizer/Grid/Node/Node';
import { ColRow, equals } from './algorithms';

type BFSNode = {
  explored: boolean;
  parent: BFSNode | null;
  isWall: boolean;
} & ColRow;

const addValidNeighboursToQueueInOrder = (
  currentNode: BFSNode,
  nRow: number,
  nCol: number,
  queue: BFSNode[],
  bfsGrid: BFSNode[][],
) => {
  const defaultNodeDetails = {
    explored: false,
    isWall: false,
    parent: currentNode,
    col: currentNode.col,
    row: currentNode.row,
  };
  if (
    currentNode.col > 0 &&
    !bfsGrid[currentNode.row][currentNode.col - 1].isWall &&
    !bfsGrid[currentNode.row][currentNode.col - 1].explored
  ) {
    queue.push({ ...defaultNodeDetails, col: currentNode.col - 1 });
  }
  //Push Bottom
  if (
    currentNode.row < nRow - 1 &&
    !bfsGrid[currentNode.row + 1][currentNode.col].isWall &&
    !bfsGrid[currentNode.row + 1][currentNode.col].explored
  ) {
    queue.push({ ...defaultNodeDetails, row: currentNode.row + 1 });
  }
  //Push Right
  if (
    currentNode.col < nCol - 1 &&
    !bfsGrid[currentNode.row][currentNode.col + 1].isWall &&
    !bfsGrid[currentNode.row][currentNode.col + 1].explored
  ) {
    queue.push({ ...defaultNodeDetails, col: currentNode.col + 1 });
  }
  //Push Top
  if (
    currentNode.row > 0 &&
    !bfsGrid[currentNode.row - 1][currentNode.col].isWall &&
    !bfsGrid[currentNode.row - 1][currentNode.col].explored
  ) {
    queue.push({ ...defaultNodeDetails, row: currentNode.row - 1 });
  }
};

export const bfs = (start: ColRow, goal: ColRow, grid: NodeType[][], nRow: number, nCol: number): ColRow[][] => {
  const queue: BFSNode[] = [];
  queue.push({ ...start, explored: false, parent: null, isWall: false });
  const bfsGrid: BFSNode[][] = [];

  for (let row = 0; row < nRow; row++) {
    const bfsRow = [];
    for (let col = 0; col < nCol; col++) {
      bfsRow.push({ col, row, parent: null, explored: false, isWall: grid[row][col].isWall });
    }
    bfsGrid.push(bfsRow);
  }

  const visitedNodes: ColRow[] = [];
  while (queue.length > 0) {
    const currentNode = queue.shift();
    if (currentNode == undefined) {
      return [visitedNodes, []];
    }

    //Skip to next iteration. Nodes have more than 1 neighbour and sometimes get added to the queue more than once.
    if (bfsGrid[currentNode.row][currentNode.col].explored) {
      continue;
    }
    currentNode.explored = true;
    bfsGrid[currentNode.row][currentNode.col] = { ...currentNode };
    visitedNodes.push({ col: currentNode.col, row: currentNode.row });

    if (equals(currentNode, goal)) {
      const traceback = [];
      let traceNode: BFSNode | null = currentNode;
      while (traceNode != null) {
        traceback.push(traceNode);
        traceNode = traceNode.parent;
      }
      return [visitedNodes, traceback];
    }

    addValidNeighboursToQueueInOrder(currentNode, nRow, nCol, queue, bfsGrid);
  }
  return [visitedNodes, []];
};
