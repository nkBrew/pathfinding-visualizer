import React from 'react';
import './Node.css';
import classNames from 'classnames';

export type NodeType = {
  col: number;
  row: number;
  isWall: boolean;
  isFinder: boolean;
  isTarget: boolean;
  isVisited: boolean;
  isPath: boolean;
  icon?: string;
  color?: string;
};

export type NodeProps = {
  mouseEnterHandler: (col: number, row: number) => void;
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
  isPath,
  isVisited,
  color,
  mouseEnterHandler: mouseEnterHandler,
  mouseDownHandler,
  mouseUpHandler,
}: NodeProps): JSX.Element => {
  let logo = undefined;
  if (isTarget) {
    logo = '🐈';
  } else if (isFinder) {
    logo = '😡';
  }

  const styles: { backgroundColor?: string } = {};
  if (color && !isWall) {
    styles['backgroundColor'] = color;
  }
  return (
    <div
      className="node"
      onMouseEnter={() => mouseEnterHandler(col, row)}
      onMouseDown={() => mouseDownHandler(col, row)}
      onMouseUp={() => mouseUpHandler(col, row)}
    >
      <div className="node-center-align">
        <div
          className={classNames('node-center-align', {
            'node-wall': isWall,
            'node-visited': isVisited,
            'node-path': isPath,
          })}
          style={styles}
        >
          {logo ? <div className="node-center-align node-finder"> {logo}</div> : null}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Node);
