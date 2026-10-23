"use strict";
let react = require("react");
// src/hooks/useMutableState.ts
const useMutableState = (stateContainer) => (0, react.useState)(stateContainer)[0];
exports.useMutableState = useMutableState;
