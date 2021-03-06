import React from 'react';
import { ALGORITHM, ALGORITHM_DESCRIPTIONS, ALGORITHM_FRIENDLY_NAMES } from '../../Algorithms/algorithms';
import algImg from '../Images/algorithms.png';
import algorithmAnimation from '../Images/algorithmAnimation.gif';
import wallWeightAnimation from '../Images/wallWeightAnimation.gif';
import dragFinderTarget from '../Images/dragFinderTarget.gif';
import toggleWallsWeights from '../Images/toggleWallsWeights.gif';

export type PageContentType = {
  heading: string;
  subheading?: string;
  body: JSX.Element;
};

const Page1: PageContentType = {
  heading: 'Welcome to the Pathfinding Visualizer',
  subheading: 'The Pathfinding Visualizer will show you how a pathfinding algorithm works by a visual representation',
  body: (
    <div>
      <p>
        This is a short tutorial intended to first give you a brief basic idea on what a pathfinding algorithm is and
        the basic instructions of how to use the application.
      </p>
      <p>
        {'This tutorial should take no longer than a couple minutes. ' +
          "If you'd rather learn by experimentation feel free to skip or close the tutorial " +
          'anytime by clicking on the Close Tutorial button'}
      </p>
    </div>
  ),
};

const Page2: PageContentType = {
  heading: 'What is a Pathfinding Algorithm?',
  body: (
    <div>
      <p>
        A pathfinding algorithm is used to calculate the shortest path between two points. This application aims to show
        a visual representation of what the different algorithms do at each step of their search.
      </p>
      <p>
        Ever wonder how enemies in video games find you? These algorithms are commonly used in video games for this
        exact purpose among others! Other common use Cases include logistics planning, IP routing, robotics, and more!
      </p>
      <p>
        While pathfinding algorithms can be used in many ways, this application will demonstrate the algorithm use cases
        on a 2D Cartesian plane with only horizontal and vertical moves allowed.
      </p>
    </div>
  ),
};

const Page3: PageContentType = {
  heading: 'There are Different Algorithms!',
  subheading: 'Like anything in life, not all Pathfinding algorithms are the same.',
  body: (
    <div>
      <p>
        Some pathfinding algorithms are weighted while others are unweighted. Weighted algorithms take into
        consideration the cost of reaching that node, while unweighted only consider the euclidian distance. In
        addition, some pathfinding algorithms can only promise a path between two points exists, while some promise the
        optimal shortest path between them.
      </p>
      <p>You can change algorithm used by the Visualizer from the Algorithms dropdown.</p>
      <img src={algImg} />
    </div>
  ),
};

const renderAlgorithmDescriptions = () => {
  return Object.values(ALGORITHM).map((alg) => (
    <li key={'description-' + alg}>
      <b>{ALGORITHM_FRIENDLY_NAMES[alg]}</b>: {ALGORITHM_DESCRIPTIONS[alg]}
    </li>
  ));
};

const Page4: PageContentType = {
  heading: 'Meet the algorithms',
  subheading: 'Here is a brief description of the algorithms as well as which criterias they meet.',
  body: (
    <div className="descriptions-container">
      <ul className="descriptions-ul">{renderAlgorithmDescriptions()}</ul>
    </div>
  ),
};

const Page5: PageContentType = {
  heading: 'Adding Walls And Weights',
  subheading:
    'You can add walls and weights to the visualizer by clicking and dragging on any square in the application to add a wall. ' +
    'Walls are impassable terrain for the algorithm, and when calculating a path they will avoid this terrain. ' +
    'Weights are passable terrain, but have a higher cost of passing through that node than an unweighted node.',
  body: (
    <div>
      <p>Click and drag on the visualizer to add a wall or weight</p>
      <img src={wallWeightAnimation} />
      <p>{"You can toggle what you're adding by clicking the Add Weight/Wall button"}</p>
      <img src={toggleWallsWeights} />
    </div>
  ),
};

const Page6: PageContentType = {
  heading: 'Visualizing',
  subheading: 'To see the animation of the algorithm, click on the Visualize Button!',
  body: (
    <div>
      <img src={algorithmAnimation} />
    </div>
  ),
};

const Page7: PageContentType = {
  heading: 'Moving the Finder and Target',
  subheading:
    'You can move the Finder and the target by clicking and dragging them around the screen. If a path is already on the screen, the new path and visited nodes will be immediately updated.',
  body: (
    <div>
      <img src={dragFinderTarget} />
    </div>
  ),
};
//Pages
/*
1. Welcome
2. What is a pathfinding Algorithm? 
3. Types of Algorithms in program
4. Adding Walls
5. Dragging Finder/Target
6. Running the Algorithm (Visualize Button)
*/

// const Page2:

export const PagesArray = [Page1, Page2, Page3, Page4, Page5, Page6, Page7];
