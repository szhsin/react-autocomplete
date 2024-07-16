import type { Traversal, TraversalProps } from '../common';

export interface LinearTraversalProps<T> extends TraversalProps {
  items: T[];
}

const linearTraversal =
  <T>({ traverseInput, items }: LinearTraversalProps<T>): Traversal<T> =>
  ({ focusItem, setFocusItem, isItemDisabled, isEqual }) => {
    return {
      items,

      traverse: (isForward) => {
        const baseIndex = traverseInput ? -1 : 0;
        let newItem: T | undefined,
          nextIndex = items.findIndex((item) => isEqual(focusItem, item)),
          itemCounter = 0;
        const itemLength = items.length;
        for (;;) {
          if (isForward) {
            if (++nextIndex >= itemLength) nextIndex = baseIndex;
          } else {
            if (--nextIndex < baseIndex) nextIndex = itemLength - 1;
          }
          newItem = items[nextIndex];
          if (!newItem || !isItemDisabled?.(newItem)) break;
          if (++itemCounter >= itemLength) return focusItem;
        }

        setFocusItem(newItem);
        return newItem;
      }
    };
  };

export { linearTraversal };
