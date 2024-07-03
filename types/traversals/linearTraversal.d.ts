import type { Traversal, TraversalProps } from '../common';
export interface LinearTraversalProps<T> extends TraversalProps {
    items: T[];
}
declare const linearTraversal: <T>({ traverseInput, items }: LinearTraversalProps<T>) => Traversal<T>;
export { linearTraversal };
