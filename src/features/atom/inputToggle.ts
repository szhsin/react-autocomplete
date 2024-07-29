import type { Feature, GetPropsFunctions } from '../../types';
import { getId, buttonProps } from '../../common';
import { useToggle } from '../../hooks/useToggle';
import { useFocusCapture } from '../../hooks/useFocusCapture';

type InputToggleFeature<T> = Feature<
  T,
  Pick<GetPropsFunctions<T>, 'getToggleProps' | 'getInputProps'>
>;

const inputToggle =
  <T>(): InputToggleFeature<T> =>
  ({ id, inputRef, open, setOpen }) => {
    const [startToggle, stopToggle] = useToggle(open, setOpen);
    const [startCapture, inCapture, stopCapture] = useFocusCapture(inputRef);

    return {
      getToggleProps: () => ({
        ...buttonProps,
        'aria-expanded': open,
        'aria-controls': getId(id, 'l'),

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
