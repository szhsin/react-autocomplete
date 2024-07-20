import { useMutableState } from './useMutableState.js';

const useFocusCapture = focusRef => {
  const mutable = useMutableState({});
  return [() => {
    if (document.activeElement === focusRef.current) mutable.a = 1;
  }, () => {
    if (mutable.a) {
      mutable.a = 0;
      focusRef.current?.focus();
      return true;
    }
  }, () => focusRef.current?.focus()];
};

export { useFocusCapture };
