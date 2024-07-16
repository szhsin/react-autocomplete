import { useMutableState } from '../hooks/useMutableState.js';

const linearTraversal = ({
  traverseInput,
  items
}) => ({
  focusItem,
  setFocusItem,
  isItemDisabled,
  isEqual
}) => {
  const mutable = useMutableState({
    a: -1
  });
  return {
    items,
    traverse: isForward => {
      if (!focusItem) mutable.a = -1;else if (!isEqual(focusItem, items[mutable.a])) mutable.a = items.findIndex(item => isEqual(focusItem, item));
      const baseIndex = traverseInput ? -1 : 0;
      let newItem,
        nextIndex = mutable.a,
        itemCounter = 0;
      const itemLength = items.length;
      for (;;) {
        if (isForward) {
          if (++nextIndex >= itemLength) nextIndex = baseIndex;
        } else {
          if (--nextIndex < baseIndex) nextIndex = itemLength - 1;
        }
        newItem = items[nextIndex];
        if (!newItem || !(isItemDisabled != null && isItemDisabled(newItem))) break;
        if (++itemCounter >= itemLength) return focusItem;
      }
      mutable.a = nextIndex;
      setFocusItem(newItem);
      return newItem;
    }
  };
};

export { linearTraversal };
