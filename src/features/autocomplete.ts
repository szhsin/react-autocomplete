import type { Feature, GetProps } from '../common';

const scrollIntoView = (element: HTMLElement | null) =>
  element?.scrollIntoView({ block: 'nearest' });

const autocomplete =
  <T>({
    rovingText,
    constricted
  }: { rovingText?: boolean; constricted?: boolean } = {}): Feature<T> =>
  ({
    $: cxMutable,
    getItemValue,
    isItemDisabled,
    traverse,
    onChange,
    setInputValue,
    selectedItem,
    setSelectedItem,
    focusItem,
    setFocusItem,
    open,
    setOpen,
    inputRef
  }) => {
    const updateValue = (value: string, moveCaretToEnd: boolean = true) => {
      setInputValue(value);
      const endIndex = value.length;
      moveCaretToEnd && inputRef.current!.setSelectionRange(endIndex, endIndex);

      if (cxMutable.b != value) {
        cxMutable.b = value;
        onChange(value);
      }
    };

    const updateItem = (item?: T) => item !== selectedItem && setSelectedItem(item);

    const updateAll = (item?: T) => {
      updateItem(item);
      updateValue(getItemValue(item));
    };

    const closeList = () => {
      setOpen(false);
      setFocusItem();
    };

    const getInputProps: GetProps<T>['getInputProps'] = () => ({
      onChange: (e) => {
        setFocusItem();
        setOpen(true);
        updateValue(e.target.value, false);
      },

      onClick: () => setOpen(true),

      onBlur: () => {
        if (!open) return;
        if (focusItem) {
          updateAll(focusItem);
        } else if (constricted) {
          if (cxMutable.b) updateAll(selectedItem);
          else updateItem();
        } else if (getItemValue(selectedItem) != cxMutable.b) {
          updateItem();
        }
        closeList();
      },

      onKeyDown: (e) => {
        switch (e.key) {
          case 'ArrowUp':
          case 'ArrowDown':
            e.preventDefault();
            if (open) {
              const nextItem = traverse(e.key != 'ArrowUp');
              if (rovingText) setInputValue(getItemValue(nextItem) || cxMutable.b);
            } else {
              setOpen(true);
            }
            break;
          case 'Enter':
            if (open && focusItem) {
              updateAll(focusItem);
              closeList();
            }
            break;
          case 'Escape':
            if (open) {
              if (constricted) {
                updateAll(selectedItem);
              } else if (!cxMutable.b || getItemValue(selectedItem) != cxMutable.b) {
                updateItem();
                updateValue(cxMutable.b);
              }
              closeList();
            }
            break;
        }
      }
    });

    const getItemProps: GetProps<T>['getItemProps'] = ({ item }) => ({
      ref: focusItem === item ? scrollIntoView : null,
      onClick: () => {
        if (!isItemDisabled(item)) {
          updateAll(item);
          closeList();
        }
      }
    });

    return {
      getInputProps,
      getItemProps,
      getListProps: () => ({})
    };
  };

export { autocomplete };
