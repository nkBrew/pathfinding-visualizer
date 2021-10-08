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
  closedList: AStarNode[];
  shortestPath: AStarNode[];
};

const hCost = (target: ColRow, current: ColRow): number => {
  return (current.row - target.row) ** 2 + (current.col - target.col) ** 2;
};

const equals = (node1: ColRow, node2: ColRow): boolean => {
  return node1.row == node2.row && node1.col == node2.col;
};

export const aStar = (goal: ColRow, start: ColRow, grid: NodeType[][], length: number): AStarReturnObject | null => {
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
      let traceNode = currentNode;
      while (traceNode.parent != null) {
        traceBack.push(traceNode);
        traceNode = traceNode.parent;
      }
      return { closedList: closed, shortestPath: traceBack };
    }

    const childrenPositions = [
      { col: currentNode.col + 1, row: currentNode.row },
      { col: currentNode.col - 1, row: currentNode.row },
      { col: currentNode.col, row: currentNode.row + 1 },
      { col: currentNode.col, row: currentNode.row - 1 },
      { col: currentNode.col + 1, row: currentNode.row + 1 },
      { col: currentNode.col + 1, row: currentNode.row - 1 },
      { col: currentNode.col - 1, row: currentNode.row + 1 },
      { col: currentNode.col - 1, row: currentNode.row - 1 },
    ];

    //Check if within bounds and walkable
    const validChildrenPositions = childrenPositions.filter(
      (child) =>
        child.row < length &&
        child.row >= 0 &&
        child.col < length &&
        child.col >= 0 &&
        !grid[child.row][child.col].isWall,
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
