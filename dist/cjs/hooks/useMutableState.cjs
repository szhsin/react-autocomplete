"use strict";
let react = require("react");
//#region src/hooks/useMutableState.ts
const useMutableState = (stateContainer) => (0, react.useState)(stateContainer)[0];
//#endregion
exports.useMutableState = useMutableState;
