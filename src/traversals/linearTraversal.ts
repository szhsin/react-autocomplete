import type { Traversal, TraversalProps } from '../common';
import { useMutableState } from '../hooks/useMutableState';

export interface LinearTraversalProps<T> extends TraversalProps {
  items: T[];
}

interface MutableState {
  /**
   * ### INTERNAL API ###
   * The index for the latest focus item in the array
   */
  a: number;
}

const linearTraversal =
  <T>({ traverseInput, items }: LinearTraversalProps<T>): Traversal<T> =>
  ({ focusItem, setFocusItem, isItemDisabled, isEqual }) => {
    const mutable = useMutableState<MutableState>({ a: -1 });
    return {
      traverse: (isForward) => {
        if (!focusItem) mutable.a = -1;
        else if (!isEqual(focusItem, items[mutable.a]))
          mutable.a = items.findIndex((item) => isEqual(focusItem, item));

        const baseIndex = traverseInput ? -1 : 0;
        let newItem: T | undefined,
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
          if (!newItem || !isItemDisabled?.(newItem)) break;
          if (++itemCounter >= itemLength) return focusItem;
        }

        mutable.a = nextIndex;
        setFocusItem(newItem);
        return newItem;
      }
    };
  };

export { linearTraversal };
