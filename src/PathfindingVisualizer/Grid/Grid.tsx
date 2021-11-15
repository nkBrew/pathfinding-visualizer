import React from 'react';
import '../../styles/Grid.scss';

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
