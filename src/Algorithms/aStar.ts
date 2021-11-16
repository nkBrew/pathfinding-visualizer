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
    //Find Lowest fcost node
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

    //GoalNodeFound
    if (equals(currentNode, goalNode)) {
      const traceBack = [];
      let traceNode: AStarNode | null = currentNode;
      while (traceNode != null) {
        traceBack.push(traceNode);
        traceNode = traceNode.parent;
      }
      return [closed, traceBack];
    }

    //Get Possible Children Positions
    const neighbourPositions = [
      { col: currentNode.col + 1, row: currentNode.row },
      { col: currentNode.col - 1, row: currentNode.row },
      { col: currentNode.col, row: currentNode.row + 1 },
      { col: currentNode.col, row: currentNode.row - 1 },
      // { col: currentNode.col + 1, row: currentNode.row + 1 },
      // { col: currentNode.col + 1, row: currentNode.row - 1 },
      // { col: currentNode.col - 1, row: currentNode.row + 1 },
      // { col: currentNode.col - 1, row: currentNode.row - 1 },
    ];

    //Get ones within bounds and walkable
    const validNeighbourPositions = neighbourPositions.filter(
      (child) =>
        child.row < nRow &&
        child.row >= 0 &&
        child.col < nCol &&
        child.col >= 0 &&
        grid[child.row][child.col].nodeClass != NODECLASS.WALL,
    );

    for (const neighbour of validNeighbourPositions) {
      let onClosed = false;
      for (const c of closed) {
        if (equals(c, neighbour)) {
          onClosed = true;
          break;
        }
      }
      if (onClosed) {
        continue;
      }
      const weight =
        grid[neighbour.row][neighbour.col].nodeClass == NODECLASS.WEIGHT ? WEIGHTED_NODE_WEIGHT_CONSTANT : 1;
      const gcost = currentNode.gcost + weight;
      const hcost = hCost(neighbour, goalNode);
      const fcost = gcost + hcost;

      const neighbourNode: AStarNode = { ...neighbour, parent: currentNode, fcost: fcost, hcost: hcost, gcost: gcost };

      const sameNeighbourOnOpenIndex = findNodeIndex(neighbourNode, open);

      if (sameNeighbourOnOpenIndex == -1) {
        //Hasn't been looked at yet therefore add to open list

        open.push(neighbourNode);
      } else if (open[sameNeighbourOnOpenIndex].gcost > gcost) {
        //Same node is Already on the openList but with a worse cost.
        //So update it with the new neighbourNode details
        open[sameNeighbourOnOpenIndex] = { ...neighbourNode };
      }
    }
  }
  return [closed, []];
};

const findNodeIndex = (node: AStarNode, open: AStarNode[]): number => {
  for (let i = 0; i < open.length; i++) {
    if (equals(node, open[i])) {
      return i;
    }
  }
  return -1;
};
