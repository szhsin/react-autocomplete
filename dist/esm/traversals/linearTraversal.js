import { useState } from 'react';

const linearTraversal = ({
  traverseInput,
  isItemDisabled,
  items = []
}) => ({
  focusItem,
  setFocusItem
}) => {
  const [instance] = useState({
    a: -1
  });
  return {
    traverse: isForward => {
      if (!focusItem) instance.a = -1;else if (focusItem !== items[instance.a]) instance.a = items.indexOf(focusItem);
      const baseIndex = traverseInput ? -1 : 0;
      let nextIndex = instance.a;
      let nextItem;
      const itemLength = items.length;
      do {
        if (isForward) {
          if (++nextIndex >= itemLength) nextIndex = baseIndex;
        } else {
          if (--nextIndex < baseIndex) nextIndex = itemLength - 1;
        }
        nextItem = items[nextIndex];
        if (!nextItem || !(isItemDisabled != null && isItemDisabled(nextItem))) break;
      } while (nextIndex !== instance.a);
      instance.a = nextIndex;
      setFocusItem(nextItem);
      return nextItem;
    }
  };
};

export { linearTraversal };
