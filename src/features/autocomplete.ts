import type { Feature, ChangeType, GetProps } from '../common';

const scrollIntoView = (element: HTMLElement | null) =>
  element?.scrollIntoView({ block: 'nearest' });

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
    const updateValue = (type: ChangeType, value: string, item?: T | null | undefined) => {
      cxInstance.b = value;
      setInputValue(value);
      const endIndex = value.length;
      type !== 'input' && inputRef.current!.setSelectionRange(endIndex, endIndex);
      onChange(value, { type, item });
    };

    const updateAndCloseList = (
      type: ChangeType,
      value: string | null | undefined,
      item?: T | null | undefined
    ) => {
      if (open) {
        if (value != null) {
          updateValue(type, value, item);
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
        updateValue('input', e.target.value);
      },

      onSelect: (e) => {
        const { value, selectionStart, selectionEnd } = e.target as HTMLInputElement;
        const [start, end] = cxInstance.c;
        if (cxInstance.b !== value && (selectionStart !== start || selectionEnd !== end)) {
          setFocusItem();
          updateValue('input', value);
        }
      },

      onClick: () => setOpen(true),

      onBlur: () => updateAndCloseList('blur', getItemValue(focusItem), focusItem),

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
            updateAndCloseList('submit', getItemValue(focusItem), focusItem);
            break;
          case 'Escape':
            updateAndCloseList('esc', cxInstance.b);
            break;
        }
      }
    });

    const getItemProps: GetProps<T>['getItemProps'] = ({ item }) => ({
      ref: focusItem === item ? scrollIntoView : null,
      onClick: () => !isItemDisabled(item) && updateAndCloseList('submit', getItemValue(item), item)
    });

    return {
      getInputProps,
      getItemProps,
      getListProps: () => ({})
    };
  };

export { autocomplete };
