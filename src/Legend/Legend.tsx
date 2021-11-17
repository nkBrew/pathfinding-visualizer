import React from 'react';
import { faCat, faFish, faWeightHanging } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/Legend.scss';
import { ALGORITHM } from '../Algorithms/algorithms';

const ALGORITHM_LEGEND_DESCRIPTIONS = {
  [ALGORITHM.DFS]: (
    <p>
      <i>
        <b>Depth First Search</b> is <b>unweighted</b> and <b>DOES guarantee the shortest path</b>
      </i>
    </p>
  ),
  [ALGORITHM.BFS]: (
    <p>
      <i>
        <b>Breadth First Search</b> is <b>unweighted</b> and <b>guarantees the shortest path</b>
      </i>
    </p>
  ),
  [ALGORITHM.DIJKSTRA]: (
    <p>
      <i>
        <b>Dijkstra</b> is <b>weighted</b> and <b>guarantees the shortest path</b>
      </i>
    </p>
  ),
  [ALGORITHM.ASTAR]: (
    <p>
      <i>
        <b>A* Star</b> is <b>weighted</b> and <b>guarantees the shortest path</b>
      </i>
    </p>
  ),
  [ALGORITHM.GREEDY]: (
    <p>
      <i>
        <b>Greedy Search</b> is <b>weighted</b> and <b>does not guarantee the shortest path</b>
      </i>
    </p>
  ),
};

type LegendProps = {
  algorithm: ALGORITHM;
};

const Legend = ({ algorithm }: LegendProps): JSX.Element => {
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
        <li className="legend-algorithm-description">
          <div>{ALGORITHM_LEGEND_DESCRIPTIONS[algorithm]}</div>
        </li>
      </ul>
    </div>
  );
};

export default Legend;
