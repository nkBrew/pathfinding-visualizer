import { NodeType } from '../PathfindingVisualizer/Grid/Node/Node';
import { ColRow, equals } from './algorithms';

type DFSNode = {
  explored: boolean;
  parent: DFSNode | null;
  isWall: boolean;
} & ColRow;

const addValidNeighboursToStackInOrder = (
  currentNode: DFSNode,
  nRow: number,
  nCol: number,
  stack: DFSNode[],
  dfsGrid: DFSNode[][],
) => {
  const defaultNodeDetails = {
    explored: false,
    isWall: false,
    parent: currentNode,
    col: currentNode.col,
    row: currentNode.row,
  };
  //Push Left
  if (
    currentNode.col > 0 &&
    !dfsGrid[currentNode.row][currentNode.col - 1].isWall &&
    !dfsGrid[currentNode.row][currentNode.col - 1].explored
  ) {
    stack.push({ ...defaultNodeDetails, col: currentNode.col - 1 });
  }
  //Push Bottom
  if (
    currentNode.row < nRow - 1 &&
    !dfsGrid[currentNode.row + 1][currentNode.col].isWall &&
    !dfsGrid[currentNode.row + 1][currentNode.col].explored
  ) {
    stack.push({ ...defaultNodeDetails, row: currentNode.row + 1 });
  }
  //Push Right
  if (
    currentNode.col < nCol - 1 &&
    !dfsGrid[currentNode.row][currentNode.col + 1].isWall &&
    !dfsGrid[currentNode.row][currentNode.col + 1].explored
  ) {
    stack.push({ ...defaultNodeDetails, col: currentNode.col + 1 });
  }
  //Push Top
  if (
    currentNode.row > 0 &&
    !dfsGrid[currentNode.row - 1][currentNode.col].isWall &&
    !dfsGrid[currentNode.row - 1][currentNode.col].explored
  ) {
    stack.push({ ...defaultNodeDetails, row: currentNode.row - 1 });
  }
};

export const dfs = (start: ColRow, goal: ColRow, grid: NodeType[][], nRow: number, nCol: number): ColRow[][] => {
  const stack: DFSNode[] = [];
  const rootNode: DFSNode = { explored: false, isWall: false, parent: null, ...start };
  stack.push(rootNode);

  const visitedNodes: ColRow[] = [];
  const dfsGrid: DFSNode[][] = [];
  for (let row = 0; row < nRow; row++) {
    const dfsRow = [];
    for (let col = 0; col < nCol; col++) {
      dfsRow.push({ row, col, explored: false, parent: null, isWall: grid[row][col].isWall });
    }
    dfsGrid.push(dfsRow);
  }

  while (stack.length > 0) {
    const currentNode = stack.pop();
    if (currentNode == undefined) {
      return [visitedNodes, []];
    }
    currentNode.explored = true;
    dfsGrid[currentNode.row][currentNode.col] = { ...currentNode };
    visitedNodes.push({ col: currentNode.col, row: currentNode.row });

    if (equals(currentNode, goal)) {
      const traceback = [];
      let traceNode: DFSNode | null = currentNode;
      while (traceNode != null) {
        traceback.push(traceNode);
        traceNode = traceNode.parent;
      }
      return [visitedNodes, traceback];
    }

    addValidNeighboursToStackInOrder(currentNode, nRow, nCol, stack, dfsGrid);
  }
  return [visitedNodes, []];
};
