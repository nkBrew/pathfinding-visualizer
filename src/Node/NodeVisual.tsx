import React from 'react';
import '../PathfindingVisualizer/Grid/Node/Node.scss';

type NodeVisualProps = {
  className: string;
};

const NodeVisual = ({ className }: NodeVisualProps) => {
  return (
    <div className="node">
      <div className={className}></div>
    </div>
  );
};

export default NodeVisual;
