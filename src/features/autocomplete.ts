import type { Feature, ChangeType } from '../common';
import { CHANGETYPE_SUBMIT, CHANGETYPE_CHANGE, CHANGETYPE_INSERT } from '../common';

const autocomplete: (props?: { rovingInput?: boolean }) => Feature =
  ({ rovingInput } = {}) =>
  ({
    _: cxInstance,
    items,
    onChange,
    setInputValue,
    focusIndex,
    setFocusIndex,
    isOpen,
    setOpen
  }) => {
    const updateValue = (value: string, type: ChangeType) => {
      cxInstance.b = value;
      cxInstance.c = type;
      setInputValue(value);
      onChange(value, { type });
    };

    const updateAndCloseList = (value: string | undefined, type: ChangeType) => {
      if (isOpen) {
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
      onItemClick: (_, { index }) => updateAndCloseList(items[index], CHANGETYPE_SUBMIT),

      onInputChange: (e) => {
        setFocusIndex(-1);
        setOpen(true);
        updateValue(
          e.target.value,
          (e.nativeEvent as unknown as { inputType: string }).inputType === 'insertText'
            ? CHANGETYPE_INSERT
            : CHANGETYPE_CHANGE
        );
      },

      onInputClick: () => setOpen(true),

      onBlur: () => updateAndCloseList(items[focusIndex], CHANGETYPE_CHANGE),

      onKeyDown: ({ key }) => {
        switch (key) {
          case 'ArrowUp':
            if (isOpen) {
              traverseItems(true);
            } else {
              setOpen(true);
            }
            break;
          case 'ArrowDown':
            if (isOpen) {
              traverseItems(false);
            } else {
              setOpen(true);
            }
            break;
          case 'Enter':
            updateAndCloseList(items[focusIndex], CHANGETYPE_SUBMIT);
            break;
          case 'Escape':
            updateAndCloseList(cxInstance.b, CHANGETYPE_CHANGE);
            break;
        }
      }
    };
  };

export { autocomplete };
