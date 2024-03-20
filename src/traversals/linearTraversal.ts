import { useState } from 'react';
import type { Traversal, TraversalProps } from '../common';

interface LinearTraversalProps<T> extends TraversalProps {
  items?: T[];
}

interface Instance {
  /**
   * ### INTERNAL API ###
   * The index for the latest focus item in the array
   */
  a: number;
}

const linearTraversal =
  <T>({ traverseInput, items = [] }: LinearTraversalProps<T>): Traversal<T> =>
  ({ focusItem, setFocusItem, isItemDisabled }) => {
    const [instance] = useState<Instance>({ a: -1 });
    return {
      traverse: (isForward) => {
        if (!focusItem) instance.a = -1;
        else if (focusItem !== items[instance.a]) instance.a = items.indexOf(focusItem);

        const baseIndex = traverseInput ? -1 : 0;
        let nextIndex = instance.a;
        let nextItem: T | undefined;
        const itemLength = items.length;
        do {
          if (isForward) {
            if (++nextIndex >= itemLength) nextIndex = baseIndex;
          } else {
            if (--nextIndex < baseIndex) nextIndex = itemLength - 1;
          }
          nextItem = items[nextIndex];
          if (!nextItem || !isItemDisabled(nextItem)) break;
        } while (nextIndex !== instance.a);

        instance.a = nextIndex;
        setFocusItem(nextItem);
        return nextItem;
      }
    };
  };

export { linearTraversal };
