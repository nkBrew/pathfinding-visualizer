import React from 'react';
import './Node.css';
import classNames from 'classnames';

export type NodeType = {
  col: number;
  row: number;
  isWall: boolean;
  isFinder: boolean;
  isTarget: boolean;
  icon?: string;
};

export type NodeProps = {
  mouseHoverHandler: (col: number, row: number) => void;
  mouseUpHandler: (col: number, row: number) => void;
  mouseDownHandler: (col: number, row: number) => void;
} & NodeType;

const Node = ({
  icon,
  col,
  row,
  isWall,
  isFinder,
  isTarget,
  mouseHoverHandler,
  mouseDownHandler,
  mouseUpHandler,
}: NodeProps): JSX.Element => {
  let logo = undefined;
  if (isTarget) {
    logo = '🐈';
  } else if (isFinder) {
    logo = '😡';
  }

  return (
    <div
      className={classNames('node', { 'node-wall': isWall })}
      onMouseOver={() => mouseHoverHandler(col, row)}
      onMouseDown={() => mouseDownHandler(col, row)}
      onMouseUp={() => mouseUpHandler(col, row)}
    >
      {logo ? <div className="node-center-align"> {logo}</div> : null}
    </div>
  );
};

export default Node;
