import type { Feature, ChangeType } from '../common';

const autocomplete: (props?: { rovingInput?: boolean }) => Feature =
  ({ rovingInput } = {}) =>
  ({ _: cxInstance, items, onChange, setInputValue, focusIndex, setFocusIndex, open, setOpen }) => {
    const updateValue = (value: string, type: ChangeType) => {
      cxInstance.b = value;
      setInputValue(value);
      onChange(value, { type });
    };

    const updateAndCloseList = (value: string | undefined, type: ChangeType) => {
      if (open) {
        if (value != null) {
          updateValue(value, type);
        }
        setOpen(false);
        setFocusIndex(-1);
      }
    };

    const traverseItems = (isUp: boolean) => {
      const baseIndex = rovingInput ? -1 : 0;
      let nextIndex = focusIndex;
      const itemLength = items.length;
      if (isUp) {
        if (--nextIndex < baseIndex) nextIndex = itemLength - 1;
      } else {
        if (++nextIndex >= itemLength) nextIndex = baseIndex;
      }
      setFocusIndex(nextIndex);
      rovingInput && setInputValue(items[nextIndex] ?? cxInstance.b);
    };

    return {
      onItemClick: (_, { index }) => updateAndCloseList(items[index], 'submit'),

      onInputChange: (e) => {
        setFocusIndex(-1);
        setOpen(true);
        updateValue(e.target.value, 'input');
      },

      onInputClick: () => setOpen(true),

      onBlur: () => updateAndCloseList(items[focusIndex], 'blur'),

      onKeyDown: ({ key }) => {
        switch (key) {
          case 'ArrowUp':
            if (open) {
              traverseItems(true);
            } else {
              setOpen(true);
            }
            break;
          case 'ArrowDown':
            if (open) {
              traverseItems(false);
            } else {
              setOpen(true);
            }
            break;
          case 'Enter':
            updateAndCloseList(items[focusIndex], 'submit');
            break;
          case 'Escape':
            updateAndCloseList(cxInstance.b, 'esc');
            break;
        }
      }
    };
  };

export { autocomplete };
