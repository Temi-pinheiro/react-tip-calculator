import { useState } from 'react';

function TipButton(props) {
  const { value } = props;

  return <button>{value}%</button>;
}

export default TipButton;
