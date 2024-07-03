import type { Traversal, TraversalProps } from '../common';
export interface GroupedTraversalProps<G, T> extends TraversalProps {
    groupedItems: G[] | {
        [s: string]: T[];
    } | ArrayLike<T[]>;
    getItemsInGroup?: (group: G) => T[];
}
declare const groupedTraversal: <G, T>({ groupedItems, getItemsInGroup, ...restProps }: GroupedTraversalProps<G, T>) => Traversal<T>;
export { groupedTraversal };
