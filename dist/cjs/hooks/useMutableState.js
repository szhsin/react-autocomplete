'use strict';

var React = require('react');

const useMutableState = stateContainer => React.useState(stateContainer)[0];

exports.useMutableState = useMutableState;
