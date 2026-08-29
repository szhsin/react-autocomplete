import { useState } from "react";
//#region src/hooks/useMutableState.ts
const useMutableState = (stateContainer) => useState(stateContainer)[0];
//#endregion
export { useMutableState };
