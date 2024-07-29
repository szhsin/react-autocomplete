import type { Feature, GetProps } from '../../types';
import { useFocusCapture } from '../../hooks/useFocusCapture';

type MultiInputFeature<T> = Feature<
  T,
  Pick<GetProps<T>, 'getInputProps' | 'getInputWrapperProps'>
>;

const multiInput =
  <T>(): MultiInputFeature<T> =>
  ({ inputRef, removeSelect }) => {
    const [startCapture, inCapture, stopCapture] = useFocusCapture(inputRef);

    return {
      getInputWrapperProps: () => ({
        onMouseDown: startCapture,
        onClick: stopCapture
      }),

      getInputProps: () => ({
        onBlur: inCapture,

        onKeyDown: (e) =>
          !(e.target as HTMLInputElement).value && e.key === 'Backspace' && removeSelect?.()
      })
    };
  };

export { type MultiInputFeature, multiInput };
