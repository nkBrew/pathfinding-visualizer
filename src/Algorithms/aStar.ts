import { NODECLASS, NodeType } from '../PathfindingVisualizer/Grid/Node/Node';
import { ColRow, equals, hCost, WEIGHTED_NODE_WEIGHT_CONSTANT } from './algorithms';

export type AStarNode = {
  parent: AStarNode | null;
  fcost: number;
  gcost: number;
  hcost: number;
} & ColRow;

export const aStar = (start: ColRow, goal: ColRow, grid: NodeType[][], nRow: number, nCol: number): ColRow[][] => {
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
      return [closed, traceBack];
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
        child.row < nRow &&
        child.row >= 0 &&
        child.col < nCol &&
        child.col >= 0 &&
        grid[child.row][child.col].nodeClass != NODECLASS.WALL,
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
      const weight = grid[child.row][child.col].nodeClass == NODECLASS.WEIGHT ? WEIGHTED_NODE_WEIGHT_CONSTANT : 1;
      const gcost = currentNode.gcost + weight;
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
  return [];
};
