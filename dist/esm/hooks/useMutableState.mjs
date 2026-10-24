import { useState } from "react";
// src/hooks/useMutableState.ts
const useMutableState = (stateContainer) => useState(stateContainer)[0];
export { useMutableState };
