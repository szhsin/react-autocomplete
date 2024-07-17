import type { Feature, GetPropsFunctions } from '../../types';
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
    const [startCapture, inCapture, stopCapture] = useFocusCapture(inputRef);

    return {
      getToggleProps: () => ({
        tabIndex: -1,

        onMouseDown: () => {
          startToggle();
          startCapture();
        },

        onClick: () => {
          stopToggle();
          stopCapture();
        }
      }),

      getInputProps: () => ({
        onBlur: inCapture
      })
    };
  };

export { type InputToggleFeature, inputToggle };
