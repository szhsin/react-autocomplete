import { useState } from 'react';
import type { Feature, GetPropsFunctions } from '../../common';

type InputFocusFeature<T> = Feature<
  T,
  Pick<GetPropsFunctions<T>, 'getInputProps'> & { focused: boolean }
>;

const inputFocus =
  <T>(): InputFocusFeature<T> =>
  () => {
    const [focused, setFocused] = useState(false);

    return {
      focused,

      getInputProps: () => ({
        onFocusCapture: () => setFocused(true),
        onBlurCapture: () => setFocused(false)
      })
    };
  };

export { type InputFocusFeature, inputFocus };
