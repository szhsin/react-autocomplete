import type { Feature, ChangeType, GetProps } from '../common';

const autocomplete: (props?: { rovingText?: boolean; traverseInput?: boolean }) => Feature =
  ({ rovingText, traverseInput } = {}) =>
  ({
    _: cxInstance,
    items,
    onChange,
    setInputValue,
    focusIndex,
    setFocusIndex,
    open,
    setOpen,
    inputRef
  }) => {
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
      const baseIndex = traverseInput ?? rovingText ? -1 : 0;
      let nextIndex = focusIndex;
      const itemLength = items.length;
      if (isUp) {
        if (--nextIndex < baseIndex) nextIndex = itemLength - 1;
      } else {
        if (++nextIndex >= itemLength) nextIndex = baseIndex;
      }
      setFocusIndex(nextIndex);
      if (rovingText) {
        setInputValue(items[nextIndex] ?? cxInstance.b);
        const input = inputRef.current!;
        cxInstance.c = [input.selectionStart, input.selectionEnd];
      }
    };

    const getInputProps: GetProps['getInputProps'] = () => ({
      onChange: (e) => {
        setFocusIndex(-1);
        setOpen(true);
        updateValue(e.target.value, 'input');
      },

      onSelect: (e) => {
        const { value, selectionStart, selectionEnd } = e.target as HTMLInputElement;
        const [start, end] = cxInstance.c;
        if (cxInstance.b !== value && (selectionStart !== start || selectionEnd !== end)) {
          setFocusIndex(-1);
          updateValue(value, 'input');
        }
      },

      onClick: () => setOpen(true),

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
    });

    const getItemProps: GetProps['getItemProps'] = (option) => ({
      onClick: () => updateAndCloseList(items[option?.index as number], 'submit')
    });

    return {
      getInputProps,
      getItemProps
    };
  };

export { autocomplete };
