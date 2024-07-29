import type {
  Feature,
  GetProps,
  GetPropsWithRef,
  GetPropsWithOptionalRef,
  AutocompleteFeatureProps,
  FeatureState
} from '../../types';
import { getId, buttonProps, defaultFocusIndex } from '../../common';
import { useFocusCapture } from '../../hooks/useFocusCapture';

type AutocompleteLiteFeature<T> = Feature<
  T,
  Pick<GetProps<T>, 'getListProps' | 'getClearProps'> &
    Pick<GetPropsWithRef<T>, 'getInputProps'> &
    Pick<GetPropsWithOptionalRef<T>, 'getItemProps'> &
    FeatureState
>;

const scrollIntoView = (element: HTMLElement | null) =>
  element?.scrollIntoView({ block: 'nearest' });

const autocompleteLite =
  <T>({
    rovingText,
    select,
    selectOnBlur = rovingText,
    deselectOnClear = true,
    deselectOnChange = true,
    closeOnSelect = true
  }: AutocompleteFeatureProps<T> = {}): AutocompleteLiteFeature<T> =>
  ({
    getItemValue,
    getSelectedValue,
    onSelectChange,
    isItemSelected,
    isItemDisabled,
    isItemAction,
    onAction,
    value,
    onChange,
    tmpValue,
    setTmpValue,
    focusIndex,
    setFocusIndex,
    open,
    setOpen,
    inputRef,
    items,
    id
  }) => {
    const [startCapture, inCapture, stopCapture] = useFocusCapture(inputRef);

    const inputValue = (tmpValue || value) ?? getSelectedValue();
    const focusItem = items[focusIndex];
    const listId = getId(id, 'l');

    const selectItemOrAction = (item: T, noAction?: boolean) => {
      if (isItemAction?.(item)) {
        !noAction && onAction?.(item);
        return true; // Always close list on action
      }

      const itemValue = getItemValue(item);
      if (!select) onChange(itemValue);
      const endIndex = itemValue.length;
      inputRef.current?.setSelectionRange(endIndex, endIndex);
      // We place onSelectChange after onChange to give user an opportunity
      // to manipulate the `value` state
      onSelectChange(item);
    };

    const resetState = (shouldClose?: boolean) => {
      setFocusIndex(defaultFocusIndex);
      setTmpValue();
      if (shouldClose || closeOnSelect) {
        setOpen(false);
        if (select) onChange();
      }
    };

    const traverse = (isForward: boolean) => {
      const baseIndex = rovingText ? -1 : 0;
      let newItem: T | undefined,
        newIndex = focusIndex,
        itemCounter = 0;
      const itemLength = items.length;
      for (;;) {
        if (isForward) {
          if (++newIndex >= itemLength) newIndex = baseIndex;
        } else {
          if (--newIndex < baseIndex) newIndex = itemLength - 1;
        }
        newItem = items[newIndex];
        if (!newItem || !isItemDisabled?.(newItem)) break;
        if (++itemCounter >= itemLength) return;
      }

      setFocusIndex(newIndex);
      if (rovingText) setTmpValue(getItemValue(newItem));
    };

    return {
      isInputEmpty: !inputValue,

      getClearProps: () => ({
        ...buttonProps,

        onMouseDown: startCapture,

        onClick: () => {
          stopCapture();
          setOpen(true);
          setTmpValue();
          setFocusIndex(defaultFocusIndex);
          onChange('');
          if (deselectOnClear) onSelectChange();
        }
      }),

      getListProps: () => ({
        id: listId,
        role: 'listbox',
        onMouseDown: startCapture,
        onClick: stopCapture
      }),

      getItemProps: ({ item, index }) => ({
        id: getId(id, index),
        role: 'option',
        'aria-selected': select ? isItemSelected(item) : index === focusIndex,
        ref: index === focusIndex ? scrollIntoView : undefined,
        onClick: () => {
          if (!isItemDisabled?.(item)) {
            resetState(selectItemOrAction(item));
          }
        }
      }),

      getInputProps: () => ({
        type: 'text',
        role: 'combobox',
        autoComplete: 'off',
        'aria-autocomplete': 'list',
        'aria-expanded': open,
        'aria-controls': listId,
        'aria-activedescendant': focusIndex >= 0 ? getId(id, focusIndex) : undefined,
        ref: inputRef,
        value: inputValue,

        onChange: (e) => {
          setOpen(true);
          setFocusIndex(defaultFocusIndex);
          setTmpValue();

          const newValue = e.target.value;
          onChange(newValue);
          if ((!select && deselectOnChange) || (deselectOnClear && !newValue)) {
            onSelectChange();
          }
        },

        onBlur: () => {
          if (inCapture()) return;

          if (selectOnBlur && focusItem) {
            selectItemOrAction(focusItem, true);
          }

          resetState(true);
        },

        onKeyDown: (e) => {
          switch (e.key) {
            case 'ArrowUp':
            case 'ArrowDown':
              e.preventDefault();
              if (open) {
                traverse(e.key != 'ArrowUp');
              } else {
                setOpen(true);
              }
              break;
            case 'Enter':
              if (open) {
                if (focusItem) {
                  // Call preventDefault as we've already triggered on* events in this branch
                  e.preventDefault();
                  resetState(selectItemOrAction(focusItem));
                } else if (!select) {
                  resetState(true);
                }
              }
              break;
            case 'Escape':
              if (open) {
                resetState(true);
              } else {
                onChange('');
                if (deselectOnClear) onSelectChange();
              }
              break;
          }
        },

        onMouseDown: (e) => e.stopPropagation(),
        onClick: () => setOpen(true)
      })
    };
  };

export { type AutocompleteLiteFeature, autocompleteLite };
