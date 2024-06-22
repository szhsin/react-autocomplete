import type {
  Feature,
  GetPropsFunctions,
  GetPropsWithRefFunctions,
  AutocompleteFeatureProps,
  Clearable
} from '../../common';
import { useMutableState } from '../../hooks/useMutableState';

type AutocompleteLiteFeature<T> = Feature<
  T,
  Pick<GetPropsFunctions<T>, 'getListProps' | 'getItemProps' | 'getClearProps'> &
    Pick<GetPropsWithRefFunctions<T>, 'getInputProps'> &
    Clearable
>;

interface MutableState {
  /**
   * ### INTERNAL API ###
   * Whether to bypass onblur event on input
   */
  a?: boolean | 0 | 1;
}

const scrollIntoView = (element: HTMLElement | null) =>
  element?.scrollIntoView({ block: 'nearest' });

const autocompleteLite =
  <T>({
    rovingText,
    select,
    selectOnBlur = rovingText,
    deselectOnClear = true,
    deselectOnChange = true
  }: AutocompleteFeatureProps<T> = {}): AutocompleteLiteFeature<T> =>
  ({
    getItemValue,
    isItemDisabled,
    traverse,
    value,
    onChange,
    tmpValue,
    setTmpValue,
    selectedItem,
    setSelectedItem,
    focusItem,
    setFocusItem,
    open,
    setOpen,
    inputRef
  }) => {
    const mutable = useMutableState<MutableState>({});

    const inputValue = (tmpValue || value) ?? getItemValue(selectedItem);

    const updateValue = (newValue: string) => {
      const endIndex = newValue.length;
      inputRef.current!.setSelectionRange(endIndex, endIndex);
      if (!select) onChange(newValue);
    };

    const updateItem = (item?: T) => item !== selectedItem && setSelectedItem(item);

    const updateAll = (item?: T) => {
      updateItem(item);
      updateValue(getItemValue(item));
    };

    const closeList = () => {
      setOpen(false);
      setFocusItem();
      setTmpValue();
      if (select) onChange();
    };

    return {
      clearable: !!inputValue,

      getClearProps: () => ({
        tabIndex: -1,

        onMouseDown: () => {
          if (document.activeElement === inputRef.current) mutable.a = 1;
        },

        onClick: () => {
          inputRef.current?.focus();
          setOpen(true);
          onChange('');
          setTmpValue();
          setFocusItem();
          if (deselectOnClear) updateItem();
        }
      }),

      getListProps: () => ({
        onMouseDown: () => {
          mutable.a = 1;
        }
      }),

      getItemProps: ({ item }) => ({
        ref: focusItem === item ? scrollIntoView : null,
        onClick: () => {
          if (!isItemDisabled(item)) {
            updateAll(item);
            closeList();
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
          if ((!select && deselectOnChange) || (deselectOnClear && !newValue)) updateItem();
        },

        onBlur: ({ target }) => {
          if (mutable.a) {
            mutable.a = 0;
            target.focus();
            return;
          }

          if (!open) return;

          if (selectOnBlur && focusItem) {
            updateAll(focusItem);
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
                if (rovingText) setTmpValue(getItemValue(nextItem));
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
              if (open) closeList();
              break;
          }
        },

        onClick: () => setOpen(true)
      })
    };
  };

export { type AutocompleteLiteFeature, autocompleteLite };
