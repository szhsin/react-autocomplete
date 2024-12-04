import { useMutableState } from './useMutableState.mjs';

const useToggle = (open, setOpen) => {
  const mutable = useMutableState({});
  return [() => mutable.a = open, () => {
    if (mutable.a) {
      mutable.a = 0;
    } else {
      setOpen(true);
    }
  }];
};

export { useToggle };
