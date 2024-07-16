const linearTraversal = ({
  traverseInput,
  items
}) => ({
  focusItem,
  setFocusItem,
  isItemDisabled,
  isEqual
}) => {
  return {
    items,
    traverse: isForward => {
      const baseIndex = traverseInput ? -1 : 0;
      let newItem,
        nextIndex = items.findIndex(item => isEqual(focusItem, item)),
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
      setFocusItem(newItem);
      return newItem;
    }
  };
};

export { linearTraversal };
