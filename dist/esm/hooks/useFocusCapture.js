import { useMutableState } from './useMutableState.js';

const useFocusCapture = focusRef => {
  const mutable = useMutableState({});
  return [() => {
    if (document.activeElement === focusRef.current) mutable.a = 1;
  }, () => {
    if (mutable.a) {
      var _focusRef$current;
      mutable.a = 0;
      (_focusRef$current = focusRef.current) == null || _focusRef$current.focus();
      return true;
    }
  }, () => {
    var _focusRef$current2;
    return (_focusRef$current2 = focusRef.current) == null ? void 0 : _focusRef$current2.focus();
  }];
};

export { useFocusCapture };
