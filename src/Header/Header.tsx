import React, { useState } from 'react';
import './Header.css';
import classNames from 'classnames';
import { ALGORITHM, ALGORITHM_FRIENDLY_NAMES } from '../Algorithms/algorithms';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

type HeaderProps = {
  visualizing: boolean;
  algorithm: ALGORITHM;
  onAlgorithmSelect: (algorithm: ALGORITHM) => void;
  onVisualize: () => void;
  onClear: (clearWalls: boolean, clearPath: boolean, resetPathOnScreen: boolean) => void;
};

const Header = ({ visualizing, algorithm, onAlgorithmSelect, onVisualize, onClear }: HeaderProps): JSX.Element => {
  const [showAlgorithms, setShowAlgorithms] = useState(false);

  const renderAlgorithmOptions = () => {
    return Object.values(ALGORITHM).map((value) => (
      <a target="#" key={'algorithm-dropdown-option' + value} onClick={() => onAlgorithmSelect(value)}>
        {ALGORITHM_FRIENDLY_NAMES[value]}
      </a>
    ));
  };
  const visualString = 'Visualizing' + (algorithm ? ' ' + ALGORITHM_FRIENDLY_NAMES[algorithm] : '') + '!';

  return (
    <div className="header-main">
      <div className="header-inner">
        <ul className="header-wrapper">
          <li>
            <div className="title">Pathfinding Visualizer</div>
          </li>
          <li
            className="header-button"
            onClick={() => setShowAlgorithms(!showAlgorithms)}
            tabIndex={0}
            onBlur={() => setShowAlgorithms(false)}
          >
            <div className="dropdown-container">
              <div className="dropdown-button">
                <div className="algorithms-label">Algorithms</div>
                <FontAwesomeIcon icon={showAlgorithms ? faCaretUp : faCaretDown} />
              </div>
              <div className={classNames('dropdown-content', { open: showAlgorithms })}>{renderAlgorithmOptions()}</div>
            </div>
          </li>
          <li className="header-button">
            <button className={classNames('visualize-button')} onClick={() => onVisualize()} disabled={visualizing}>
              {visualString}
            </button>
          </li>
          <li className="header-button" onClick={() => onClear(true, true, true)}>
            <div>Clear Board</div>
          </li>
          <li className="header-button" onClick={() => onClear(true, false, false)}>
            <div>Clear Walls</div>
          </li>
          <li className="header-button" onClick={() => onClear(false, true, true)}>
            <div>Clear Path</div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
