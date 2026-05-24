import { useState } from 'react';

const useMutableState = stateContainer => useState(stateContainer)[0];

export { useMutableState };
