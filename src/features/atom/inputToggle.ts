import type { Feature, GetPropsFunctions } from '../../common';
import { useMutableState } from '../../hooks/useMutableState';

type InputToggleFeature<T> = Feature<
  T,
  Pick<GetPropsFunctions<T>, 'getToggleProps' | 'getInputProps'>
>;

interface MutableState {
  /**
   * ### INTERNAL API ###
   * Whether to skip opening list after clicking toggle
   */
  b?: boolean | 0 | 1;
  /**
   * ### INTERNAL API ###
   * Whether input blur was initiated by toggle
   */
  c?: boolean | 0 | 1;
}

const inputToggle =
  <T>(): InputToggleFeature<T> =>
  ({ inputRef, open, setOpen }) => {
    const mutable = useMutableState<MutableState>({});

    return {
      getToggleProps: () => ({
        tabIndex: -1,

        onMouseDown: () => {
          mutable.b = open;
          mutable.c = 1;
        },

        onClick: () => {
          if (mutable.b) {
            mutable.b = 0;
          } else {
            setOpen(true);
          }
          inputRef.current?.focus();
        }
      }),

      getInputProps: () => ({
        onBlur: ({ target }) => {
          if (mutable.c) {
            mutable.c = 0;
            target.focus();
          }
        }
      })
    };
  };

export { type InputToggleFeature, inputToggle };
