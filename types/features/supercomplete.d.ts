import type { Feature } from '../common';
declare const supercomplete: <T>(props?: {
    constricted?: boolean;
}) => Feature<T, {
    inlineComplete: (props: {
        item: T;
    }) => void;
}>;
export { supercomplete };
