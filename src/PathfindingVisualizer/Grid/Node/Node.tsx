import React from 'react';
import '../../../styles/Node.scss';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCat, faFish, faWeightHanging } from '@fortawesome/free-solid-svg-icons';

export enum NODECLASS {
  WALL = 'Wall',
  WEIGHT = 'Weight',
  FINDER = 'FINDER',
  TARGET = 'TARGET',
  NORMAL = 'NORMAL',
}

export type NodeType = {
  col: number;
  row: number;
  isVisited: boolean;
  isPath: boolean;
  nodeClass: NODECLASS;
};

export type NodeProps = {
  pathOnScreen: boolean;
  touchMoving: NODECLASS.FINDER | NODECLASS.TARGET | null;
  mouseEnterHandler: (col: number, row: number) => void;
  mouseUpHandler: (col: number, row: number) => void;
  mouseDownHandler: (col: number, row: number) => void;
  touchEndHandler: (col: number, row: number, event: React.TouchEvent<HTMLDivElement>) => void;
} & NodeType;

const finderColor = 'rgb(89, 89, 89)';
const targetColor = 'rgb(89, 89, 89)';

const Node = ({
  col,
  row,
  isPath,
  isVisited,
  pathOnScreen,
  nodeClass,
  touchMoving,
  mouseEnterHandler,
  mouseDownHandler,
  mouseUpHandler,
  touchEndHandler,
}: NodeProps): JSX.Element => {
  return (
    <div
      className="node"
      onMouseEnter={() => mouseEnterHandler(col, row)}
      onMouseDown={() => mouseDownHandler(col, row)}
      onMouseUp={() => mouseUpHandler(col, row)}
      onTouchEnd={(e) => touchEndHandler(col, row, e)}
    >
      <div className="node-center-align">
        <div
          className={classNames('', {
            'node-wall': nodeClass == NODECLASS.WALL,
            'node-visited': isVisited && !pathOnScreen && !isPath,
            'node-visited-no-ani': isVisited && pathOnScreen,
            'node-path': isPath && !pathOnScreen,
            'node-path-no-ani': isPath && pathOnScreen,
            'finder-target-touch': touchMoving == nodeClass,
          })}
        />
        {nodeClass == NODECLASS.FINDER && (
          <div className="node-icon">
            <FontAwesomeIcon icon={faCat} size="lg" color={finderColor} />
          </div>
        )}
        {nodeClass == NODECLASS.TARGET && (
          <div className="node-icon">
            <FontAwesomeIcon icon={faFish} size="1x" transform={{ rotate: 20 }} color={targetColor} />
          </div>
        )}
        {nodeClass == NODECLASS.WEIGHT && (
          <div className="node-icon node-weight">
            <FontAwesomeIcon icon={faWeightHanging} size="1x" color={targetColor} />
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(Node);
