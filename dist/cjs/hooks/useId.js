'use strict';

var React = require('react');

let current = 0;
const useIdShim = () => {
  const [id, setId] = React.useState();
  React.useEffect(() => setId(++current), []);
  return id && `szh-ac${id}-`;
};
const useId = React.useId || useIdShim;

exports.useId = useId;
