import type {
  Feature,
  GetPropsFunctions,
  GetPropsWithRefFunctions,
  AutocompleteFeatureProps,
  Clearable
} from '../../common';
import { useFocusCapture } from '../../hooks/useFocusCapture';

type AutocompleteLiteFeature<T> = Feature<
  T,
  Pick<GetPropsFunctions<T>, 'getListProps' | 'getItemProps' | 'getClearProps'> &
    Pick<GetPropsWithRefFunctions<T>, 'getInputProps'> &
    Clearable
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
    isEqual,
    isItemDisabled,
    isItemAction,
    onAction,
    traverse,
    value,
    onChange,
    tmpValue,
    setTmpValue,
    focusItem,
    setFocusItem,
    open,
    setOpen,
    inputRef
  }) => {
    const [startCapture, inCapture, stopCapture] = useFocusCapture(inputRef);

    const inputValue = (tmpValue || value) ?? getSelectedValue();

    const selectItemOrAction = (item: T, noAction?: boolean) => {
      if (isItemAction?.(item)) {
        !noAction && onAction?.(item);
        return true; // Always close list on action
      }

      onSelectChange(item);
      const itemValue = getItemValue(item);
      const endIndex = itemValue.length;
      inputRef.current!.setSelectionRange(endIndex, endIndex);
      if (!select) onChange(itemValue);
    };

    const resetState = (shouldClose?: boolean) => {
      setFocusItem();
      setTmpValue();
      if (shouldClose || closeOnSelect) {
        setOpen(false);
        if (select) onChange();
      }
    };

    return {
      clearable: !!inputValue,

      getClearProps: () => ({
        tabIndex: -1,

        onMouseDown: startCapture,

        onClick: () => {
          stopCapture();
          setOpen(true);
          setTmpValue();
          setFocusItem();
          onChange('');
          if (deselectOnClear) onSelectChange();
        }
      }),

      getListProps: () => ({
        onMouseDown: startCapture,
        onClick: stopCapture
      }),

      getItemProps: ({ item }) => ({
        ref: isEqual(focusItem, item) ? scrollIntoView : null,
        onClick: () => {
          if (!isItemDisabled?.(item)) {
            resetState(selectItemOrAction(item));
          }
        }
      }),

      getInputProps: () => ({
        ref: inputRef,

        value: inputValue,

        onChange: (e) => {
          setOpen(true);
          setFocusItem();
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
                const nextItem = traverse(e.key != 'ArrowUp');
                if (rovingText) setTmpValue(getItemValue(nextItem));
              } else {
                setOpen(true);
              }
              break;
            case 'Enter':
              if (open && focusItem) {
                resetState(selectItemOrAction(focusItem));
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
