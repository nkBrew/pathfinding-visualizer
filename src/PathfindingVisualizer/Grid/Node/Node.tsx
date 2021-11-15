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
}

export type NodeType = {
  col: number;
  row: number;
  isFinder: boolean;
  isTarget: boolean;
  isVisited: boolean;
  isPath: boolean;
  nodeClass?: NODECLASS;
};

export type NodeProps = {
  pathOnScreen: boolean;
  mouseEnterHandler: (col: number, row: number) => void;
  mouseUpHandler: (col: number, row: number) => void;
  mouseDownHandler: (col: number, row: number) => void;
} & NodeType;

const finderColor = 'rgb(89, 89, 89)';
const targetColor = 'rgb(89, 89, 89)';

const Node = ({
  col,
  row,
  isFinder,
  isTarget,
  isPath,
  isVisited,
  pathOnScreen,
  nodeClass,
  mouseEnterHandler,
  mouseDownHandler,
  mouseUpHandler,
}: NodeProps): JSX.Element => {
  return (
    <div
      className="node"
      onMouseEnter={() => mouseEnterHandler(col, row)}
      onMouseDown={() => mouseDownHandler(col, row)}
      onMouseUp={() => mouseUpHandler(col, row)}
    >
      <div className="node-center-align">
        <div
          className={classNames('', {
            'node-wall': nodeClass == NODECLASS.WALL,
            'node-visited': isVisited && !pathOnScreen && !isPath,
            'node-visited-no-ani': isVisited && pathOnScreen,
            'node-path': isPath && !pathOnScreen,
            'node-path-no-ani': isPath && pathOnScreen,
          })}
        />
        {isFinder && (
          <div className="node-icon">
            <FontAwesomeIcon icon={faCat} size="lg" color={finderColor} />
          </div>
        )}
        {isTarget && (
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
