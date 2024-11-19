import { useMutableState } from './useMutableState';

interface MutableState {
  /**
   * ### INTERNAL API ###
   * Whether to capture focus
   */
  a?: boolean | 0 | 1;
}

const useFocusCapture = (focusRef: React.RefObject<HTMLElement>) => {
  const mutable = useMutableState<MutableState>({});

  return [
    () => {
      if (document.activeElement === focusRef.current) mutable.a = 1;
    },
    () => {
      if (mutable.a) {
        mutable.a = 0;
        focusRef.current?.focus();
        return true;
      }
    },
    () => {
      mutable.a = 0;
      focusRef.current?.focus();
    }
  ] as const;
};

export { useFocusCapture };
