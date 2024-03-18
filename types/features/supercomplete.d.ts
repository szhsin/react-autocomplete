import type { Feature } from '../common';
declare const supercomplete: <T>() => Feature<T, {
    inlineComplete: (props: {
        item: T;
    }) => void;
}>;
export { supercomplete };
