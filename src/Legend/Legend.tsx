import { faCat, faFish, faWeightHanging } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './Legend.scss';

const Legend = (): JSX.Element => {
  return (
    <div className="legend">
      <ul className="legend-flexbox-wrapper">
        <li>
          <div>
            <div>Finder</div>
            <FontAwesomeIcon icon={faCat} />
          </div>
        </li>
        <li>
          <div>
            <div>Target</div>
            <FontAwesomeIcon icon={faFish} />
          </div>
        </li>
        <li>
          <div>
            <div>Wall</div>
            <div className="legend-node">
              <div className="legend-node-wall" />
            </div>
          </div>
        </li>
        <li>
          <div>
            <div>Weight</div>
            <FontAwesomeIcon icon={faWeightHanging} />
          </div>
        </li>
        <li>
          <div>
            <div>Visited Node </div>
            <div className="legend-node">
              <div className="legend-node-visited-0" />
            </div>
            <div className="legend-node">
              <div className="legend-node-visited-1" />
            </div>
            <div className="legend-node">
              <div className="legend-node-visited-2" />
            </div>
          </div>
        </li>
        <li>
          <div>
            <div>Path Node</div>
            <div className="legend-node">
              <div className="legend-node-path-0" />
            </div>
            <div className="legend-node">
              <div className="legend-node-path-1" />
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Legend;
