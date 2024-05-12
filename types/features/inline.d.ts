import type { Feature, GetProps } from '../common';
type InlineFeature<T> = Feature<T, {
    inlineComplete: (props: {
        item: T;
    }) => void;
} & Pick<GetProps<T>, 'getInputProps'>>;
declare const inline: <T>() => InlineFeature<T>;
export { type InlineFeature, inline };
