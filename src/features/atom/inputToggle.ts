import type { Feature, GetPropsFunctions } from '../../common';
import { useToggle } from '../../hooks/useToggle';
import { useFocusCapture } from '../../hooks/useFocusCapture';

type InputToggleFeature<T> = Feature<
  T,
  Pick<GetPropsFunctions<T>, 'getToggleProps' | 'getInputProps'>
>;

const inputToggle =
  <T>(): InputToggleFeature<T> =>
  ({ inputRef, open, setOpen }) => {
    const [startToggle, stopToggle] = useToggle(open, setOpen);
    const [startCapture, stopCapture] = useFocusCapture(inputRef);

    return {
      getToggleProps: () => ({
        tabIndex: -1,

        onMouseDown: () => {
          startToggle();
          startCapture();
        },

        onClick: () => {
          stopToggle();
          inputRef.current?.focus();
        }
      }),

      getInputProps: () => ({
        onBlur: stopCapture
      })
    };
  };

export { type InputToggleFeature, inputToggle };
