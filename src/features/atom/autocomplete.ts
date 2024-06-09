import type {
  Feature,
  GetPropsFunctions,
  GetPropsWithRefFunctions,
  FeatureProps
} from '../../common';
import { useMutableState } from '../../hooks/useMutableState';

type AutocompleteFeature<T> = Feature<
  T,
  Pick<GetPropsFunctions<T>, 'getListProps' | 'getItemProps'> &
    Pick<GetPropsWithRefFunctions<T>, 'getInputProps'>
>;

interface MutableState {
  /**
   * ### INTERNAL API ###
   * Whether to bypass onblur event on input
   */
  a?: number;
}

const scrollIntoView = (element: HTMLElement | null) =>
  element?.scrollIntoView({ block: 'nearest' });

const autocomplete =
  <T>({
    rovingText,
    constricted,
    selectOnBlur = true,
    deselectOnBlur = true
  }: Pick<
    FeatureProps<T>,
    'rovingText' | 'constricted' | 'selectOnBlur' | 'deselectOnBlur'
  > = {}): AutocompleteFeature<T> =>
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

    const updateValue = (newValue: string, moveCaretToEnd: boolean = true) => {
      setTmpValue();
      const endIndex = newValue.length;
      moveCaretToEnd && inputRef.current!.setSelectionRange(endIndex, endIndex);

      if (value != newValue) onChange(newValue);
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

    const getListProps: GetPropsFunctions<T>['getListProps'] = () => ({
      onMouseDown: () => {
        mutable.a = 1;
      },
      onClick: () => {
        inputRef.current?.focus();
        mutable.a = 0;
      }
    });

    const getInputProps: GetPropsWithRefFunctions<T>['getInputProps'] = () => ({
      ref: inputRef,

      value: tmpValue || value,

      onChange: (e) => {
        setFocusItem();
        setOpen(true);
        updateValue(e.target.value, false);
      },

      onClick: () => setOpen(true),

      onBlur: (e) => {
        if (mutable.a || !open) {
          if (open) e.target.focus();
          return;
        }

        if (selectOnBlur && focusItem) {
          updateAll(focusItem);
        } else if (constricted) {
          if (value || !deselectOnBlur) updateAll(selectedItem);
          else updateItem();
        } else if (getItemValue(selectedItem) != value) {
          updateItem();
        }

        setTmpValue();
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
            if (open) {
              if (constricted) {
                updateAll(selectedItem);
              } else if (!value || getItemValue(selectedItem) != value) {
                updateItem();
                updateValue(value);
              }
              closeList();
            }
            break;
        }
      }
    });

    const getItemProps: GetPropsFunctions<T>['getItemProps'] = ({ item }) => ({
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
      getListProps
    };
  };

export { type AutocompleteFeature, autocomplete };
