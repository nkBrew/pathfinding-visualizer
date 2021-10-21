import { NodeType } from '../PathfindingVisualizer/Grid/Node/Node';

type ColRow = {
  col: number;
  row: number;
};

export type AStarNode = {
  parent: AStarNode | null;
  fcost: number;
  gcost: number;
  hcost: number;
} & ColRow;

type AStarReturnObject = {
  exploredNodes: AStarNode[];
  shortestPath: AStarNode[];
};

export type DijkstraNode = {
  dist: number;
  previous: DijkstraNode | null;
  explored: boolean;
} & ColRow;

const hCost = (target: ColRow, current: ColRow): number => {
  return (current.row - target.row) ** 2 + (current.col - target.col) ** 2;
};

const equals = (node1: ColRow, node2: ColRow): boolean => {
  return node1.row == node2.row && node1.col == node2.col;
};

export const aStar = (
  goal: ColRow,
  start: ColRow,
  grid: NodeType[][],
  nCol: number,
  nRow: number,
): AStarReturnObject | null => {
  const open = [];
  const closed = [];

  const startNode: AStarNode = { ...start, parent: null, fcost: 0, gcost: 0, hcost: 0 };
  const goalNode: AStarNode = { ...goal, parent: null, fcost: 0, gcost: 0, hcost: 0 };

  open.push(startNode);

  while (open.length > 0) {
    let currentNode = open[0];
    let currentIndex = open.indexOf(currentNode);
    open.forEach((node, i) => {
      if (node.fcost < currentNode.fcost) {
        currentNode = node;
        currentIndex = i;
      }
    });
    open.splice(currentIndex, 1);
    closed.push(currentNode);

    if (equals(currentNode, goalNode)) {
      //GoalNodeFound
      const traceBack = [];
      let traceNode: AStarNode | null = currentNode;
      while (traceNode != null) {
        traceBack.push(traceNode);
        traceNode = traceNode.parent;
      }
      return { exploredNodes: closed, shortestPath: traceBack };
    }

    const childrenPositions = [
      { col: currentNode.col + 1, row: currentNode.row },
      { col: currentNode.col - 1, row: currentNode.row },
      { col: currentNode.col, row: currentNode.row + 1 },
      { col: currentNode.col, row: currentNode.row - 1 },
      // { col: currentNode.col + 1, row: currentNode.row + 1 },
      // { col: currentNode.col + 1, row: currentNode.row - 1 },
      // { col: currentNode.col - 1, row: currentNode.row + 1 },
      // { col: currentNode.col - 1, row: currentNode.row - 1 },
    ];

    //Check if within bounds and walkable
    const validChildrenPositions = childrenPositions.filter(
      (child) =>
        child.row < nRow && child.row >= 0 && child.col < nCol && child.col >= 0 && !grid[child.row][child.col].isWall,
    );
    for (const child of validChildrenPositions) {
      let onClosed = false;
      for (const c of closed) {
        if (equals(c, child)) {
          onClosed = true;
          break;
        }
      }
      if (onClosed) {
        continue;
      }
      const gcost = currentNode.gcost + 1;
      const hcost = hCost(child, goalNode);
      const fcost = gcost + hcost;

      const childNode: AStarNode = { ...child, parent: currentNode, fcost: fcost, hcost: hcost, gcost: gcost };

      let inOpen = false;
      for (const o of open) {
        if (equals(childNode, o) && o.gcost < childNode.gcost) {
          inOpen = true;
        }
      }
      if (inOpen) {
        continue;
      }
      open.push(childNode);
    }
  }
  return null;
};

const map2dTo1d = (row: number, col: number, nCol: number): number => {
  return row * nCol + col;
};

const dijkstra = (start: ColRow, goal: ColRow, numRow: number, grid: NodeType[][], numCol: number) => {
  const unexplored: DijkstraNode[] = [];
  for (let row = 0; row < numRow; row++) {
    for (let col = 0; row < numCol; row++) {
      const v: DijkstraNode = { dist: Infinity, previous: null, row: row, col: col, explored: false };
      if (v.row == start.row && v.col == start.col) {
        v.dist = 0;
      }
      unexplored.push(v);
    }
  }

  const explored: DijkstraNode[] = [];

  while (unexplored.some((node) => !node.explored)) {
    let currentNode = unexplored[0];
    unexplored.forEach((node) => {
      if (node.dist < currentNode.dist) {
        currentNode = node;
      }
    });
    currentNode.explored = true;
    explored.push(currentNode);

    if (equals(currentNode, goal)) {
      const traceback = [];
      let tracenode: DijkstraNode | null = currentNode;
      while (tracenode != null) {
        traceback.push(tracenode);
        tracenode = tracenode.previous;
      }
      return traceback;
    }

    const prospectivePositions = [
      { col: currentNode.col + 1, row: currentNode.row },
      { col: currentNode.col - 1, row: currentNode.row },
      { col: currentNode.col, row: currentNode.row + 1 },
      { col: currentNode.col, row: currentNode.row - 1 },
    ];
    const validNearbyPositions = prospectivePositions.filter(
      (pos) => pos.col >= 0 && pos.col < numCol && pos.row >= 0 && pos.col < numCol && !grid[pos.row][pos.col].isWall,
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

  return;
};
