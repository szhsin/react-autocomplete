import { useState } from 'react';

const linearTraversal = ({
  traverseInput,
  items = []
}) => ({
  focusItem,
  setFocusItem,
  isItemDisabled
}) => {
  const [instance] = useState({
    a: -1
  });
  return {
    traverse: isForward => {
      if (!focusItem) instance.a = -1;else if (focusItem !== items[instance.a]) instance.a = items.indexOf(focusItem);
      const baseIndex = traverseInput ? -1 : 0;
      let newItem,
        nextIndex = instance.a,
        itemCounter = 0;
      const itemLength = items.length;
      for (;;) {
        if (isForward) {
          if (++nextIndex >= itemLength) nextIndex = baseIndex;
        } else {
          if (--nextIndex < baseIndex) nextIndex = itemLength - 1;
        }
        newItem = items[nextIndex];
        if (!newItem || !isItemDisabled(newItem)) break;
        if (++itemCounter >= itemLength) return focusItem;
      }
      instance.a = nextIndex;
      setFocusItem(newItem);
      return newItem;
    }
  };
};

export { linearTraversal };
