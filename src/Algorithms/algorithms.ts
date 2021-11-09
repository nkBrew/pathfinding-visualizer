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
  DIJKSTRA = 'DIJKSTRA',
  ASTAR = 'ASTAR',
  GREEDY = 'GREEDY',
  DFS = 'DFS',
  BFS = 'BFS',
}

export const ALGORITHM_DESCRIPTIONS = {
  [ALGORITHM.DIJKSTRA]: '(weighted) the grandfather to most pathfinding algorithms and promises the shortest path.',
  [ALGORITHM.ASTAR]:
    "(weighted) arguably the best pathfinding algorithms and the most common algoirithms used in video games. It is based on Dijkstra's algorithm with a few modifications allowing it to be much faster while still maintaing the promise of having the shortest path.",
  [ALGORITHM.GREEDY]:
    '(weighted) this algorithm, while quick, can be used when speed over correctness is the top priority. It does not promise to give you the shortest path, but it does promise to give a path fast.',
  [ALGORITHM.DFS]:
    '(unweighted) an algorithm used mostly to demonstrate how the other algorithms exceed it. DFS is not suited well for pathfinding as it takes a long time and doe not guarantee the shortest path.',
};

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
