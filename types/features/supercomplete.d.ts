import type { Feature } from '../common';
export interface Instance {
    /**
     * ### INTERNAL API ###
     * action mapper
     */
    a: [number, () => void] | [];
    /**
     * ### INTERNAL API ###
     * The most recent focus index
     */
    b?: number;
    /**
     * ### INTERNAL API ###
     * Whether the last value change is "insertText"
     */
    c?: boolean;
}
declare const supercomplete: () => Feature<{
    inlineComplete: (props: {
        index: number;
        value: string;
    }) => void;
}>;
export { supercomplete };
