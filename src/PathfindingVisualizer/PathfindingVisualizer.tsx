import React, { useEffect, useState } from 'react';
import Grid from './Grid/Grid';
import Node, { NodeType } from './Grid/Node/Node';
import './PathfindingVisualizer.css';

const PathfindingVisualizer = (): JSX.Element => {
  const [mouseDown, setMouseDown] = useState(false);
  const [nodes, setNodes] = useState<NodeType[][]>([[]]);

  useEffect(() => {
    const nodeRows = [];
    const numCol = 10;
    const w = window.innerWidth;
    console.log(w);
    const numRow = 10;

    const finderStartCol = (numCol / 3) >> 0;
    const finderStartRow = (numRow / 2) >> 0;

    console.log('finder row: ' + finderStartRow + ' col: ' + finderStartCol);

    for (let r = 0; r < numRow; r++) {
      const nodes: NodeType[] = [];
      for (let c = 0; c < numCol; c++) {
        const isFinder = finderStartCol == c && finderStartRow == r;
        const node: NodeType = { col: c, row: r, isWall: false, isFinder: isFinder };
        nodes.push(node);
      }
      nodeRows.push(nodes);
    }

    setNodes(nodeRows);
  }, []);

  const mouseDownHandler = () => {
    setMouseDown(true);
    console.log('setMouseDown');
  };

  const mouseUpHandler = () => {
    setMouseDown(false);
    console.log('setMouseUp');
  };

  const mouseHoverHandler = (col: number, row: number) => {
    if (mouseDown) {
      console.log('mouseHoveringWhileMouseDown col:' + col + ' row:' + row);
      const newNodes = [...nodes];
      const nodeToChange = { ...newNodes[row][col] };
      const updatedNode = { ...nodeToChange, isWall: !nodeToChange.isWall };
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
            mouseHoverHandler={mouseHoverHandler}
            isWall={n.isWall}
            isFinder={n.isFinder}
          />
        ))}
      </div>
    ));
  };

  return (
    <div className="PathfindingVisualizer">
      <Grid mouseDownHandler={mouseDownHandler} mouseUpHandler={mouseUpHandler}>
        {renderNodes()}
      </Grid>
    </div>
  );
};

export default PathfindingVisualizer;
