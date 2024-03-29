import { useState } from 'react';
import type { Traversal, TraversalProps } from '../common';

interface GroupedTraversalProps<G, T> extends TraversalProps {
  groupedItems?: G[] | { [s: string]: T[] } | ArrayLike<T[]>;
  getItemsInGroup?: (group: G) => T[];
}

interface Instance {
  /**
   * ### INTERNAL API ###
   * The index for the group that contains the latest focus item
   */
  a: number;
  /**
   * ### INTERNAL API ###
   * The index for the latest focus item in the group
   */
  b: number;
}

const isArray = Array.isArray;

const getNextIndex = (isForward: boolean, length: number, index: number, baseIndex: number) => {
  let outbound = 0;
  if (isForward) {
    if (++index >= length) {
      index = baseIndex;
      outbound = 1;
    }
  } else {
    if (--index < baseIndex) {
      index = length - 1;
      outbound = -1;
    }
  }

  return [index, outbound] as const;
};

const groupedTraversal =
  <G, T>({
    traverseInput,
    groupedItems,
    getItemsInGroup
  }: GroupedTraversalProps<G, T>): Traversal<T> =>
  ({ setFocusItem, isItemDisabled }) => {
    const baseIndex = traverseInput ? -1 : 0;
    const [instance] = useState<Instance>({ a: 0, b: -1 });
    const getItems = (group: G | T[]) =>
      isArray(group) ? group : getItemsInGroup ? getItemsInGroup(group) : [];

    return {
      traverse: (isForward) => {
        if (!groupedItems) return;

        const groups = isArray(groupedItems) ? groupedItems : Object.values(groupedItems);
        const groupLength = groups.length;
        if (!groupLength) return;

        let outbound: number,
          group: G | T[] | undefined,
          item: T | null | undefined,
          groupIndex = instance.a,
          itemIndex = instance.b,
          groupCounter = 0;

        for (;;) {
          group = groups[groupIndex];
          let items = getItems(group);
          [itemIndex, outbound] = getNextIndex(isForward, items.length, itemIndex, 0);
          if (outbound) {
            [groupIndex] = getNextIndex(isForward, groupLength, groupIndex, baseIndex);
            group = groups[groupIndex];
            if (!group || ++groupCounter > groupLength) {
              // Traversed on input or exhausted all items
              groupIndex = 0;
              itemIndex = -1;
              item = null;
              break;
            }
            items = getItems(group);
            if (isForward) itemIndex = 0;
            else itemIndex = items.length - 1;
          }
          item = items[itemIndex];
          if (!isItemDisabled(item)) break;
        }

        instance.a = groupIndex;
        instance.b = itemIndex;
        setFocusItem(item);
        return item;
      }
    };
  };

export { groupedTraversal };
