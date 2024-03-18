import type { Traversal, TraversalProps } from '../common';
interface LinearTraversalProps<T> extends TraversalProps<T> {
    items?: T[];
}
declare const linearTraversal: <T>({ traverseInput, isItemDisabled, items }: LinearTraversalProps<T>) => Traversal<T>;
export { linearTraversal };
