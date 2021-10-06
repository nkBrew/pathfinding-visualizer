import React from 'react';
import './Node.css';
import classNames from 'classnames';

export type NodeType = {
  col: number;
  row: number;
  isWall: boolean;
  isFinder: boolean;
  icon?: string;
};

export type NodeProps = {
  mouseHoverHandler: (col: number, row: number) => void;
} & NodeType;

const Node = ({ icon, col, row, isWall, isFinder, mouseHoverHandler }: NodeProps): JSX.Element => {
  return (
    <div className={classNames('node', { 'node-wall': isWall })} onMouseOver={() => mouseHoverHandler(col, row)}>
      {isFinder ? <div className="node-finder"> 😡</div> : null}
    </div>
  );
};

export default Node;
