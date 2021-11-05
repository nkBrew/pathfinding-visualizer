import React from 'react';

const Page1 = (): JSX.Element => {
  return (
    <div>
      <h1>Welcome to Pathfinding Visualizer</h1>
      <h4>The Pathfinding Visualizer will show you how a pathfinding algorithm works by a visual representation</h4>
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
  );
};

export default Page1;
