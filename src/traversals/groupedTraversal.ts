import type { Traversal, TraversalProps } from '../common';
import { linearTraversal } from './linearTraversal';

export interface GroupedTraversalProps<G, T> extends TraversalProps {
  groupedItems: G[] | { [s: string]: T[] } | ArrayLike<T[]>;
  getItemsInGroup?: (group: G) => T[];
}

const isArray = Array.isArray;

const groupedTraversal = <G, T>({
  groupedItems,
  getItemsInGroup,
  ...restProps
}: GroupedTraversalProps<G, T>): Traversal<T> => {
  const groups = isArray(groupedItems) ? groupedItems : Object.values(groupedItems);
  const items = groups.reduce<T[]>(
    (accu, group) =>
      accu.concat(isArray(group) ? group : getItemsInGroup ? getItemsInGroup(group) : []),
    []
  );

  return linearTraversal({ ...restProps, items });
};

export { groupedTraversal };
