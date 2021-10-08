import React from 'react';

const Button = (): JSX.Element => {
  return (
    <div>
      <button onClick={() => alert('clicked')}>Find Path</button>
    </div>
  );
};

export default Button;
