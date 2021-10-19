import React, { useEffect, useState } from 'react';
import { aStar, AStarNode } from '../Algorithms/algorithms';
import Grid from './Grid/Grid';
import Node, { NodeType } from './Grid/Node/Node';
import './PathfindingVisualizer.css';

const numCol = 20;
const numRow = 10;

const PathfindingVisualizer = (): JSX.Element => {
  const [mouseDown, setMouseDown] = useState(false);
  const [nodes, setNodes] = useState<NodeType[][]>([[]]);
  const [moving, setMoving] = useState('');
  const [finder, setFinder] = useState({ col: 0, row: 0 });
  const [target, setTarget] = useState({ col: 0, row: 0 });

  useEffect(() => {
    const nodeRows = [];

    const w = window.innerWidth;
    console.log(w);

    const finderStartCol = (numCol / 3) >> 0;
    const finderStartRow = (numRow / 2) >> 0;

    const targetStartCol = ((numCol * 2) / 3) >> 0;
    const targetStartRow = finderStartRow;

    console.log('finder row: ' + finderStartRow + ' col: ' + finderStartCol);

    for (let r = 0; r < numRow; r++) {
      const nodes: NodeType[] = [];
      for (let c = 0; c < numCol; c++) {
        const isFinder = finderStartCol == c && finderStartRow == r;
        const isTarget = targetStartCol == c && targetStartRow == r;
        const node: NodeType = {
          col: c,
          row: r,
          isWall: false,
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

  const mouseDownHandler = (col: number, row: number) => {
    setMouseDown(true);
    const n = nodes[row][col];
    if (n.isFinder) {
      setMoving('finder');
    } else if (n.isTarget) {
      setMoving('target');
    }
    console.log('setMouseDown');
  };

  const mouseUpHandler = (col: number, row: number) => {
    setMouseDown(false);
    if (moving) setMoving('');
    console.log('setMouseUp');
  };

  const mouseEnterHandler = (col: number, row: number) => {
    const n = nodes[row][col];
    if (!n.isWall) {
      const newNodes = [...nodes];
      switch (moving) {
        case 'finder':
          const oldFinder = { ...nodes[finder.row][finder.col], isFinder: false };
          const newFinder = { ...nodes[row][col], isFinder: true };

          newNodes[finder.row][finder.col] = oldFinder;
          newNodes[row][col] = newFinder;
          setNodes(nodes);
          setFinder({ col: col, row: row });
          break;
        case 'target':
          const oldTarget = { ...nodes[target.row][target.col], isTarget: false };
          const newTarget = { ...nodes[row][col], isTarget: true };

          newNodes[target.row][target.col] = oldTarget;
          newNodes[row][col] = newTarget;
          setNodes(nodes);
          setTarget({ col: col, row: row });
          break;
        default:
          break;
      }
    }
    if (mouseDown && !moving && !n.isFinder && !n.isTarget) {
      console.log('mouseHoveringWhileMouseDown col:' + col + ' row:' + row);
      const newNodes = [...nodes];
      const nodeToChange = { ...newNodes[row][col] };
      const updatedNode = { ...nodeToChange, isWall: !nodeToChange.isWall, isVisited: false, isPath: false };
      newNodes[row][col] = updatedNode;
      setNodes(newNodes);
    }
  };

  const renderNodes = (): JSX.Element[] => {
    return nodes.map((value, i) => (
      <div className="grid-row" key={'noderow' + i}>
        {value.map((n) => (
          <Node
            key={'node-' + n.col + -n.row}
            col={n.col}
            row={n.row}
            mouseEnterHandler={mouseEnterHandler}
            isWall={n.isWall}
            isFinder={n.isFinder}
            isTarget={n.isTarget}
            mouseDownHandler={mouseDownHandler}
            mouseUpHandler={mouseUpHandler}
            isPath={n.isPath}
            isVisited={n.isVisited}
            color={n.color}
          />
        ))}
      </div>
    ));
  };

  const calculate = () => {
    console.log('calculating');
    const aStarReturn = aStar(
      { col: target.col, row: target.row },
      { col: finder.col, row: finder.row },
      nodes,
      numCol,
      numRow,
    );
    const { closedList, shortestPath } = { ...aStarReturn };
    if (closedList) {
      visualize(closedList);
    }
    if (shortestPath) {
      visualizeShortestPath(shortestPath);
    }
  };

  const visualize = (closedList: AStarNode[]) => {
    for (let i = 0; i < closedList.length; i++) {
      setTimeout(() => {
        const newNodes = [...nodes];
        const closed = closedList[i];
        console.log(closed.gcost);
        const g = 255 - closed.gcost * 30;
        const b = 100 + 50 * closed.gcost;
        const rgb = 'rgb(0,' + g + ',' + b + ')';
        const updatedNode = { ...nodes[closed.row][closed.col], isVisited: true, color: rgb };
        newNodes[updatedNode.row][updatedNode.col] = updatedNode;
        setNodes(newNodes);
      }, 300 * i);
    }
  };

  const visualizeShortestPath = (shortestPath: AStarNode[]) => {
    const reversePath = shortestPath.reverse();
    for (let i = 0; i < reversePath.length; i++) {
      setTimeout(() => {
        const newNodes = [...nodes];
        const closed = reversePath[i];
        console.log(closed.gcost);
        const r = 250;
        const g = 250;
        const b = 0;
        const rgb = 'rgb(' + r + ',' + g + ',' + b + ')';
        const updatedNode = { ...nodes[closed.row][closed.col], isPath: true, color: rgb };
        newNodes[updatedNode.row][updatedNode.col] = updatedNode;
        setNodes(newNodes);
      }, 300 * shortestPath.length + 300 * i);
    }
  };

  return (
    <div className="PathfindingVisualizer">
      <Grid>{renderNodes()}</Grid>
      <button onClick={() => calculate()}>Click me</button>
    </div>
  );
};

export default PathfindingVisualizer;
