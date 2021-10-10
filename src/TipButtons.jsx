import { useState } from 'react';

function TipButton(props) {
  const { value, getTip } = props;

  const handleClick = (e) => {
    getTip(value);
  };

  return <button onClick={handleClick}>{value}%</button>;
}

export default TipButton;
