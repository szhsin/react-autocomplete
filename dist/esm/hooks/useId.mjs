import React, { useState, useEffect } from 'react';

let current = 0;
const useIdShim = () => {
  const [id, setId] = useState();
  useEffect(() => setId(++current), []);
  return id && `szh-ac${id}-`;
};
const useId = React.useId || useIdShim;

export { useId };
