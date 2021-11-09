import { NodeType } from '../PathfindingVisualizer/Grid/Node/Node';
import { aStar } from './aStar';
import { bfs } from './bfs';
import { dfs } from './dfs';
import { dijkstra } from './dijkstra';
import { greedy } from './greedy';

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
  GREEDY = 'GREEDY',
  DFS = 'DFS',
  BFS = 'BFS',
}

export const ALGORITHM_FRIENDLY_NAMES = {
  [ALGORITHM.ASTAR]: 'A* Search',
  [ALGORITHM.DIJKSTRA]: 'Dijkstra',
  [ALGORITHM.GREEDY]: 'Greedy',
  [ALGORITHM.DFS]: 'Depth First Search',
  [ALGORITHM.BFS]: 'Breadth First Search',
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
    case ALGORITHM.GREEDY:
      return greedy(start, goal, grid, nRow, nCol);
    case ALGORITHM.DFS:
      return dfs(start, goal, grid, nRow, nCol);
    case ALGORITHM.BFS:
      return bfs(start, goal, grid, nRow, nCol);
    default:
      return [];
  }
};

export const hCost = (target: ColRow, current: ColRow): number => {
  return (current.row - target.row) ** 2 + (current.col - target.col) ** 2;
};
