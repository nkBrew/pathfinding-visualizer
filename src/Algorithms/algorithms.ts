import { NodeType } from '../PathfindingVisualizer/Grid/Node/Node';
import { aStar } from './aStar';
import { dijkstra } from './dijkstra';

export type ColRow = {
  col: number;
  row: number;
};

export type AlgorithmResult = {
  exploredList: ColRow[];
  shortestPath: ColRow[];
};

export enum ALGORITHM {
  ASTAR = 'ASTAR',
  DIJKSTRA = 'DIJKSTRA',
}

export const ALGORITHM_FRIENDLY_NAMES = {
  [ALGORITHM.ASTAR]: 'A* Search',
  [ALGORITHM.DIJKSTRA]: 'Dijkstra',
};

export const equals = (node1: ColRow, node2: ColRow): boolean => {
  return node1.row == node2.row && node1.col == node2.col;
};

export const calculateByAlgorithm = (
  algorithm: ALGORITHM,
  start: ColRow,
  goal: ColRow,
  grid: NodeType[][],
  nRow: number,
  nCol: number,
): ColRow[][] => {
  switch (algorithm) {
    case ALGORITHM.DIJKSTRA:
      return dijkstra(start, goal, grid, nRow, nCol);

    case ALGORITHM.ASTAR:
      return aStar(start, goal, grid, nRow, nCol);
    default:
      return [];
  }
};
