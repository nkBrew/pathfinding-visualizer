import React from 'react';
import Node, { NodeType } from './Node/Node';
import './Grid.scss';

export type GridProps = {
  children: React.ReactNode[];
};

const Grid = ({ children }: GridProps): JSX.Element => {
  return (
    <div>
      <div className="grid-container">{children}</div>
    </div>
  );
};

export default Grid;
