import React from 'react';
import Node, { NodeType } from './Node/Node';
import './Grid.css';

export type GridProps = {
  mouseDownHandler: () => void;
  mouseUpHandler: () => void;
  children: React.ReactNode[];
};

const Grid = ({ mouseDownHandler, mouseUpHandler, children }: GridProps): JSX.Element => {
  return (
    <div>
      <div className="grid-container" onMouseDown={mouseDownHandler} onMouseUp={mouseUpHandler}>
        {children}
      </div>
    </div>
  );
};

export default Grid;
