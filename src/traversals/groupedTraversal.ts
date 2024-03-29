import type { Traversal, TraversalProps } from '../common';
import { linearTraversal } from './linearTraversal';

interface GroupedTraversalProps<G, T> extends TraversalProps {
  groupedItems?: G[] | { [s: string]: T[] } | ArrayLike<T[]>;
  getItemsInGroup?: (group: G) => T[];
}

const isArray = Array.isArray;

const groupedTraversal = <G, T>({
  groupedItems,
  getItemsInGroup,
  ...restProps
}: GroupedTraversalProps<G, T>): Traversal<T> => {
  const groups = isArray(groupedItems)
    ? groupedItems
    : groupedItems
    ? Object.values(groupedItems)
    : [];

  const items: T[] = [];
  groups.forEach((group) => {
    const itemsInGroup = isArray(group) ? group : getItemsInGroup ? getItemsInGroup(group) : [];
    items.push(...itemsInGroup);
  });

  return linearTraversal({ ...restProps, items });
};

export { groupedTraversal };
