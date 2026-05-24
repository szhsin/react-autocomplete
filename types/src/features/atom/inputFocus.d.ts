import type { Feature, GetProps } from '../../types';
type InputFocusFeature<T> = Feature<T, Pick<GetProps<T>, 'getInputProps'> & {
    focused: boolean;
}>;
declare const inputFocus: <T>() => InputFocusFeature<T>;
export { type InputFocusFeature, inputFocus };
