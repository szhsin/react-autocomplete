import type { Feature, GetPropsFunctions } from '../../common';
import { useFocusCapture } from '../../hooks/useFocusCapture';

type MultiInputFeature<T> = Feature<
  T,
  Pick<GetPropsFunctions<T>, 'getInputProps' | 'getInputWrapperProps'>
>;

const multiInput =
  <T>(): MultiInputFeature<T> =>
  ({ inputRef, removeSelect }) => {
    const [startCapture, stopCapture] = useFocusCapture(inputRef);

    return {
      getInputWrapperProps: () => ({
        onMouseDown: startCapture,

        onClick: () => inputRef.current?.focus()
      }),

      getInputProps: () => ({
        onBlur: stopCapture,

        onKeyDown: (e) =>
          !(e.target as HTMLInputElement).value && e.key === 'Backspace' && removeSelect?.()
      })
    };
  };

export { type MultiInputFeature, multiInput };
