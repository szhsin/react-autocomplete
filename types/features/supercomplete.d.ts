import type { Feature, GetProps } from '../common';
declare const supercomplete: <T>() => Feature<T, {
    inlineComplete: (props: {
        item: T;
    }) => void;
} & Pick<GetProps<T>, "getInputProps">>;
export { supercomplete };
