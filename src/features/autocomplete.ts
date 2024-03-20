import type { Feature, ChangeType, GetProps } from '../common';

const autocomplete =
  <T>({ rovingText }: { rovingText?: boolean } = {}): Feature<T> =>
  ({
    _: cxInstance,
    getItemValue,
    isItemDisabled,
    traverse,
    onChange,
    setInputValue,
    focusItem,
    setFocusItem,
    open,
    setOpen,
    inputRef
  }) => {
    const updateValue = (value: string, type: ChangeType) => {
      cxInstance.b = value;
      setInputValue(value);
      onChange(value, { type });
    };

    const updateAndCloseList = (value: string | undefined | null, type: ChangeType) => {
      if (open) {
        if (value != null) {
          updateValue(value, type);
        }
        setOpen(false);
        setFocusItem();
      }
    };

    const traverseItems = (isForward: boolean) => {
      const nextItem = traverse(isForward);
      if (rovingText) {
        setInputValue(getItemValue(nextItem) ?? cxInstance.b);
        const input = inputRef.current!;
        cxInstance.c = [input.selectionStart, input.selectionEnd];
      }
    };

    const getInputProps: GetProps<T>['getInputProps'] = () => ({
      onChange: (e) => {
        setFocusItem();
        setOpen(true);
        updateValue(e.target.value, 'input');
      },

      onSelect: (e) => {
        const { value, selectionStart, selectionEnd } = e.target as HTMLInputElement;
        const [start, end] = cxInstance.c;
        if (cxInstance.b !== value && (selectionStart !== start || selectionEnd !== end)) {
          setFocusItem();
          updateValue(value, 'input');
        }
      },

      onClick: () => setOpen(true),

      onBlur: () => updateAndCloseList(getItemValue(focusItem), 'blur'),

      onKeyDown: (e) => {
        switch (e.key) {
          case 'ArrowUp':
          case 'ArrowDown':
            e.preventDefault();
            if (open) {
              traverseItems(e.key === 'ArrowDown');
            } else {
              setOpen(true);
            }
            break;
          case 'Enter':
            updateAndCloseList(getItemValue(focusItem), 'submit');
            break;
          case 'Escape':
            updateAndCloseList(cxInstance.b, 'esc');
            break;
        }
      }
    });

    const getItemProps: GetProps<T>['getItemProps'] = ({ item }) => ({
      onClick: () => !isItemDisabled(item) && updateAndCloseList(getItemValue(item), 'submit')
    });

    return {
      getInputProps,
      getItemProps,
      getListProps: () => ({})
    };
  };

export { autocomplete };
