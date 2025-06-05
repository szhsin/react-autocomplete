import { useState } from 'react';

const multiInput = () => ({
  selected: _selected,
  setFocusIndex,
  removeSelect,
  isEqual
}) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!removeSelect) throw new Error('@szhsin/react-autocomplete: Multi-selection feature must be used with the useMultiSelect hook.');
    if (!Array.isArray(_selected)) throw new Error('@szhsin/react-autocomplete: The `selected` prop in useMultiSelect must be an array.');
  }
  const [activeTag, setActiveTag] = useState(-1);
  const resetTag = () => setActiveTag(-1);
  const selected = _selected;
  return {
    isInputActive: activeTag < 0,
    isTagActive: item => isEqual(item, selected[activeTag]),
    getInputProps: () => ({
      onBlur: resetTag,
      onChange: resetTag,
      onKeyDown: e => {
        if (e.target.value) return;
        const tagLength = selected.length;
        let nextTag = activeTag;
        switch (e.key) {
          case 'Backspace':
            removeSelect(selected[activeTag]);
          case 'ArrowUp':
          case 'ArrowDown':
          case 'Escape':
            resetTag();
            break;
          case 'ArrowLeft':
            if (nextTag < 0) {
              nextTag = tagLength - 1;
            } else if (nextTag > 0) {
              nextTag -= 1;
            }
            setActiveTag(nextTag);
            setFocusIndex(-1);
            break;
          case 'ArrowRight':
            if (nextTag >= 0) nextTag += 1;
            if (nextTag >= tagLength) nextTag = -1;
            setActiveTag(nextTag);
        }
      }
    })
  };
};

export { multiInput };
