import { useState } from 'react';

const inputFocus = () => () => {
  const [focused, setFocused] = useState(false);
  return {
    focused,
    getInputProps: () => ({
      onFocusCapture: () => setFocused(true),
      onBlurCapture: () => setFocused(false)
    })
  };
};

export { inputFocus };
