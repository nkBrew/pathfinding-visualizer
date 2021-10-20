import React from 'react';
import './Header.css';
import classNames from 'classnames';

type HeaderProps = {
  visualizing: boolean;
  onVisualize: () => void;
  onClear: (clearWalls: boolean, clearPath: boolean, resetPathOnScreen: boolean) => void;
};

const Header = ({ visualizing, onVisualize, onClear }: HeaderProps): JSX.Element => {
  return (
    <div className="header-main">
      <div className="header-inner">
        <div className="header-wrapper">
          <div className="title">Pathfinding Visualizer</div>
          <div
            className={classNames('visualize-button', { 'visualize-loading': visualizing })}
            onClick={() => onVisualize()}
          >
            Visualize!
          </div>
          <div className="header-button" onClick={() => onClear(true, true, true)}>
            Clear Board
          </div>
          <div className="header-button" onClick={() => onClear(true, false, false)}>
            Clear Walls
          </div>
          <div className="header-button" onClick={() => onClear(false, true, true)}>
            Clear Path
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
