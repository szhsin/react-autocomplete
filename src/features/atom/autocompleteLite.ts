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
    deselectOnChange = true,
    closeOnSelect = true
  }: AutocompleteFeatureProps<T> = {}): AutocompleteLiteFeature<T> =>
  ({
    getItemValue,
    getSelectedValue,
    onSelectChange,
    isItemDisabled,
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
    const mutable = useMutableState<MutableState>({});

    const inputValue = (tmpValue || value) ?? getSelectedValue();

    const selectItem = (item?: T) => {
      onSelectChange(item);

      const itemValue = getItemValue(item);
      const endIndex = itemValue.length;
      inputRef.current!.setSelectionRange(endIndex, endIndex);
      if (!select) onChange(itemValue);
    };

    const closeList = (isSelecting?: boolean) => {
      setFocusItem();
      setTmpValue();
      if (!isSelecting || closeOnSelect) {
        setOpen(false);
        if (select) onChange();
      }
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
          if (deselectOnClear) onSelectChange();
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
            selectItem(item);
            closeList(true);
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

        onBlur: ({ target }) => {
          if (mutable.a) {
            mutable.a = 0;
            target.focus();
            return;
          }

          if (!open) return;

          if (selectOnBlur && focusItem) {
            selectItem(focusItem);
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
                selectItem(focusItem);
                closeList(true);
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
