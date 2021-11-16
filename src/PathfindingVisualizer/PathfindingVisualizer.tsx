import React, { useEffect, useState } from 'react';
import { ALGORITHM, calculateByAlgorithm, ColRow } from '../Algorithms/algorithms';
import Header from '../Header/Header';
import Legend from '../Legend/Legend';
import Modal from '../Modal/Modal';
import Grid from './Grid/Grid';
import Node, { NODECLASS, NodeType } from './Grid/Node/Node';
import '../styles/PathfindingVisualizer.scss';
//in px is the size of the node + its border
const numCol = ((window.innerWidth / 34) * 0.93) >> 0;
const numRow = ((window.innerHeight / 34) * 0.9) >> 0;
// const numCol = 15;
// const numRow = 15;
const visualizationTimeConstant = 200;

const PathfindingVisualizer = (): JSX.Element => {
  const [mouseDown, setMouseDown] = useState(false);
  const [nodes, setNodes] = useState<NodeType[][]>([[]]);
  const [moving, setMoving] = useState('');
  const [finder, setFinder] = useState({ col: 0, row: 0 });
  const [target, setTarget] = useState({ col: 0, row: 0 });
  const [visualizing, setVisualizing] = useState(false);
  const [pathOnScreen, setPathOnScreen] = useState(false);
  const [algorithm, setAlgorithm] = useState(ALGORITHM.ASTAR);
  const [weightWallToggle, setWeightWallToggle] = useState<NODECLASS.WALL | NODECLASS.WEIGHT>(NODECLASS.WALL);
  const [touchMoving, setTouchMoving] = useState<NODECLASS.FINDER | NODECLASS.TARGET | null>(null);

  useEffect(() => {
    const nodeRows = [];
    const finderStartCol = (numCol / 3) >> 0;
    const finderStartRow = (numRow / 2) >> 0;

    const targetStartCol = ((numCol * 2) / 3) >> 0;
    const targetStartRow = finderStartRow;

    for (let r = 0; r < numRow; r++) {
      const nodes: NodeType[] = [];
      for (let c = 0; c < numCol; c++) {
        const isFinder = finderStartCol == c && finderStartRow == r;
        const isTarget = targetStartCol == c && targetStartRow == r;
        const node: NodeType = {
          col: c,
          row: r,
          isFinder: isFinder,
          isTarget: isTarget,
          isPath: false,
          isVisited: false,
        };
        nodes.push(node);
      }
      nodeRows.push(nodes);
    }

    setNodes(nodeRows);
    setFinder({ col: finderStartCol, row: finderStartRow });
    setTarget({ col: targetStartCol, row: targetStartRow });
  }, []);

  const clear = (clearWalls: boolean, clearPath: boolean, resetPathOnScreen: boolean) => {
    if (visualizing) {
      return;
    }
    const newNodes = [...nodes];
    for (let row = 0; row < numRow; row++) {
      for (let col = 0; col < numCol; col++) {
        const node = { ...nodes[row][col] };
        if (clearWalls) {
          node.nodeClass = undefined;
        }
        if (clearPath) {
          node.isPath = false;
          node.isVisited = false;
        }

        newNodes[row][col] = node;
      }
    }
    setNodes(newNodes);
    if (resetPathOnScreen) {
      setPathOnScreen(false);
    }
  };

  const changeWeightWallToggle = () => {
    if (weightWallToggle == NODECLASS.WEIGHT) {
      setWeightWallToggle(NODECLASS.WALL);
    } else {
      setWeightWallToggle(NODECLASS.WEIGHT);
    }
  };

  const setWeightOrWall = (col: number, row: number) => {
    const newNodes = [...nodes];
    const nodeToChange = { ...newNodes[row][col] };
    const updatedNode = {
      ...nodeToChange,
      isVisited: false,
      isPath: false,
      nodeClass: nodeToChange.nodeClass == weightWallToggle ? undefined : weightWallToggle,
    };
    newNodes[row][col] = updatedNode;
    setNodes(newNodes);
  };

  const mouseDownHandler = (col: number, row: number) => {
    setMouseDown(true);
    const n = nodes[row][col];
    if (n.isFinder) {
      setMoving('finder');
    } else if (n.isTarget) {
      setMoving('target');
    } else {
      setWeightOrWall(col, row);
    }
  };

  const mouseUpHandler = () => {
    setMouseDown(false);
    if (moving) setMoving('');
  };

  const touchEndHandler = (col: number, row: number, event: React.TouchEvent<HTMLDivElement>) => {
    if (!event.cancelable) {
      return;
    }
    event.preventDefault();
    const n = nodes[row][col];

    switch (touchMoving) {
      case NODECLASS.FINDER:
        setTouchMoving(null);
        moveFinder(col, row);
        return;
      case NODECLASS.TARGET:
        setTouchMoving(null);
        moveTarget(col, row);
        return;
      default:
        if (n.isFinder) {
          setTouchMoving(NODECLASS.FINDER);
        } else if (n.isTarget) {
          setTouchMoving(NODECLASS.TARGET);
        } else {
          setWeightOrWall(col, row);
        }
        return;
    }
  };

  const mouseEnterHandler = (col: number, row: number) => {
    const n = nodes[row][col];

    if (n.nodeClass != NODECLASS.WALL) {
      switch (moving) {
        case 'finder':
          moveFinder(col, row);
          break;
        case 'target':
          moveTarget(col, row);
          break;
        default:
          break;
      }
    }
    if (mouseDown && !moving && !n.isFinder && !n.isTarget) {
      setWeightOrWall(col, row);
    }
  };

  const moveTarget = (col: number, row: number) => {
    const newNodes = [...nodes];
    const oldTarget = { ...nodes[target.row][target.col], isTarget: false };
    const newTarget = { ...nodes[row][col], isTarget: true };

    newNodes[target.row][target.col] = oldTarget;
    newNodes[row][col] = newTarget;
    setNodes(newNodes);
    setTarget({ col: col, row: row });
    if (pathOnScreen) {
      clear(false, true, false);
      calculate(finder.row, finder.col, row, col, false);
    }
  };

  const moveFinder = (col: number, row: number) => {
    const newNodes = [...nodes];

    const oldFinder = { ...nodes[finder.row][finder.col], isFinder: false };
    const newFinder = { ...nodes[row][col], isFinder: true };

    newNodes[finder.row][finder.col] = oldFinder;
    newNodes[row][col] = newFinder;
    setNodes(newNodes);
    setFinder({ col: col, row: row });
    if (pathOnScreen) {
      clear(false, true, false);
      calculate(row, col, target.row, target.col, false);
    }
  };

  const renderNodes = (): JSX.Element[] => {
    return nodes.map((value, i) => (
      <div className="grid-row" key={'noderow' + i}>
        {value.map((n) => (
          <Node
            key={'node-' + n.row + '-' + n.col}
            col={n.col}
            row={n.row}
            mouseEnterHandler={mouseEnterHandler}
            isFinder={n.isFinder}
            isTarget={n.isTarget}
            mouseDownHandler={mouseDownHandler}
            mouseUpHandler={mouseUpHandler}
            isPath={n.isPath}
            isVisited={n.isVisited}
            pathOnScreen={pathOnScreen}
            nodeClass={n.nodeClass}
            touchEndHandler={touchEndHandler}
            touchMoving={touchMoving}
          />
        ))}
      </div>
    ));
  };

  const calculateByVisualizeButton = () => {
    clear(false, true, true);
    calculate(finder.row, finder.col, target.row, target.col, true);
  };

  const calculate = (finderRow: number, finderCol: number, targetRow: number, targetCol: number, timeout: boolean) => {
    const result = calculateByAlgorithm(
      algorithm,
      { col: finderCol, row: finderRow },
      { col: targetCol, row: targetRow },
      nodes,
      numRow,
      numCol,
    );

    const exploredList = result[0];
    const shortestPath = result[1];
    if (!pathOnScreen) {
      setVisualizing(true);
    }
    if (exploredList) {
      visualize(exploredList, timeout);
      if (shortestPath.length > 0) {
        visualizeShortestPath(exploredList.length, shortestPath, timeout);
      } else {
        setTimeout(() => {
          setVisualizing(false);
          setPathOnScreen(true);
        }, exploredList.length * visualizationTimeConstant);
      }
    }
  };

  const visualize = (exploredList: ColRow[], timeout: boolean) => {
    if (timeout) {
      for (let i = 0; i < exploredList.length; i++) {
        setTimeout(() => {
          const newNodes = [...nodes];
          const closed = exploredList[i];
          const updatedNode = { ...nodes[closed.row][closed.col], isVisited: true };
          newNodes[updatedNode.row][updatedNode.col] = updatedNode;
          setNodes(newNodes);
        }, visualizationTimeConstant * i);
      }
    } else {
      const newNodes = [...nodes];
      for (let i = 0; i < exploredList.length; i++) {
        const closed = exploredList[i];
        const updatedNode = { ...nodes[closed.row][closed.col], isVisited: true };
        newNodes[updatedNode.row][updatedNode.col] = updatedNode;
      }
      setNodes(newNodes);
    }
  };

  const visualizeShortestPath = (visitedNodesLength: number, shortestPath: ColRow[], timeout: boolean) => {
    const reversePath = shortestPath.reverse();
    if (timeout) {
      for (let i = 0; i < reversePath.length; i++) {
        setTimeout(() => {
          const newNodes = [...nodes];
          const closed = reversePath[i];
          const updatedNode = { ...nodes[closed.row][closed.col], isPath: true };
          newNodes[updatedNode.row][updatedNode.col] = updatedNode;
          setNodes(newNodes);
          //In timeout to let animation play on final node
          if (i == reversePath.length - 1) {
            setTimeout(() => {
              setVisualizing(false);
              setPathOnScreen(true);
            }, 800);
          }
        }, visualizationTimeConstant * visitedNodesLength + visualizationTimeConstant * i);
      }
    } else {
      const newNodes = [...nodes];
      for (let i = 0; i < reversePath.length; i++) {
        const closed = reversePath[i];
        const updatedNode = { ...nodes[closed.row][closed.col], isPath: true };
        newNodes[updatedNode.row][updatedNode.col] = updatedNode;
      }
      setNodes(newNodes);
      setVisualizing(false);
      setPathOnScreen(true);
    }
  };

  const changeAlgorithm = (algorithm: ALGORITHM) => {
    if (!visualizing) {
      setAlgorithm(algorithm);
    }
  };

  useEffect(() => {
    const kdf = ({ key }: { key: string }) => {
      if (key == 'w') {
        changeWeightWallToggle();
      }
    };
    window.addEventListener('keydown', kdf);
    return () => {
      window.removeEventListener('keydown', kdf);
    };
  }, [weightWallToggle]);

  return (
    <div>
      <Modal />
      <Header
        algorithm={algorithm}
        visualizing={visualizing}
        onAlgorithmSelect={changeAlgorithm}
        onVisualize={calculateByVisualizeButton}
        onClear={clear}
        weightWall={weightWallToggle}
        changeWeightWallToggle={changeWeightWallToggle}
      />
      <Legend />
      <div className="PathfindingVisualizer">
        <div>
          <Grid>{renderNodes()}</Grid>
        </div>
      </div>
    </div>
  );
};

export default PathfindingVisualizer;
