import type { Feature, GetProps } from '../../types';
type MultiInputFeature<T> = Feature<T, Pick<GetProps<T>, 'getInputProps'> & {
    isInputActive: boolean;
    isTagActive: (item: T) => boolean;
}>;
declare const multiInput: <T>() => MultiInputFeature<T>;
export { type MultiInputFeature, multiInput };
