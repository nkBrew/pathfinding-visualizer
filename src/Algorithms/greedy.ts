import { NODECLASS, NodeType } from '../PathfindingVisualizer/Grid/Node/Node';
import { ColRow, equals, hCost, WEIGHTED_NODE_WEIGHT_CONSTANT } from './algorithms';

type GreedyNode = {
  dist: number;
  nodeClass?: NODECLASS;
  previous: GreedyNode | null;
  explored: boolean;
} & ColRow;

const createNodes = (grid: NodeType[][], nRow: number, nCol: number): GreedyNode[][] => {
  const nodeRows = [];
  for (let row = 0; row < nRow; row++) {
    const nodes = [];
    for (let col = 0; col < nCol; col++) {
      const node = {
        dist: Infinity,
        row: row,
        col: col,
        nodeClass: grid[row][col].nodeClass,
        previous: null,
        explored: false,
      };
      nodes.push(node);
    }
    nodeRows.push(nodes);
  }

  return nodeRows;
};

const getValidNeighbours = (currentNode: GreedyNode, nodes: GreedyNode[][]): GreedyNode[] => {
  const nRow = nodes.length;
  if (nRow == 0) {
    return [];
  }
  const nCol = nodes[0].length;
  if (nCol == 0) {
    return [];
  }

  const neighbourPositions = [
    { col: currentNode.col + 1, row: currentNode.row },
    { col: currentNode.col - 1, row: currentNode.row },
    { col: currentNode.col, row: currentNode.row + 1 },
    { col: currentNode.col, row: currentNode.row - 1 },
  ];

  const validNeighbourPositions = neighbourPositions.filter(
    (pos) =>
      pos.row < nRow &&
      pos.row >= 0 &&
      pos.col < nCol &&
      pos.col >= 0 &&
      nodes[pos.row][pos.col].nodeClass != NODECLASS.WALL &&
      !nodes[pos.row][pos.col].explored,
  );

  const validNeighbours = validNeighbourPositions.map((pos) => nodes[pos.row][pos.col]);

  return validNeighbours;
};

export const greedy = (start: ColRow, goal: ColRow, grid: NodeType[][], nRow: number, nCol: number): ColRow[][] => {
  const nodes = createNodes(grid, nRow, nCol);
  const startNode = nodes[start.row][start.col];
  startNode.dist = hCost(goal, start);

  const queue: GreedyNode[] = [];
  const explored: GreedyNode[] = [];
  queue.push(startNode);
  while (!!queue.length) {
    let currentNode = queue[0];
    let currentIndex = 0;
    queue.forEach((node, i) => {
      if (node.dist < currentNode.dist && !node.explored) {
        currentNode = node;
        currentIndex = i;
      }
    });
    currentNode.explored = true;
    explored.push(currentNode);
    queue.splice(currentIndex, 1);

    if (equals(currentNode, goal)) {
      const traceback = [];
      let tracenode: GreedyNode | null = currentNode;
      while (tracenode != null) {
        traceback.push(tracenode);
        tracenode = tracenode.previous;
      }
      return [explored, traceback];
    }
    const validNeighbours = getValidNeighbours(currentNode, nodes);
    validNeighbours.forEach((node) => {
      const weight = grid[node.row][node.col].nodeClass == NODECLASS.WEIGHT ? WEIGHTED_NODE_WEIGHT_CONSTANT : 0;
      node.dist = hCost(goal, node) + weight;
      node.previous = currentNode;
      queue.push(node);
    });
  }

  return [explored, []];
};
