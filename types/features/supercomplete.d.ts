import type { Feature } from '../common';
export interface Instance {
    /**
     * ### INTERNAL API ###
     * Whether the last value change is "insertText"
     */
    c?: boolean | 0 | 1;
}
declare const supercomplete: <T>() => Feature<T, {
    inlineComplete: (props: {
        index?: number;
        value: string;
    }) => void;
}>;
export { supercomplete };
