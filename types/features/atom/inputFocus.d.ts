import type { Feature, GetPropsFunctions } from '../../common';
type InputFocusFeature<T> = Feature<T, Pick<GetPropsFunctions<T>, 'getInputProps'> & {
    focused: boolean;
}>;
declare const inputFocus: <T>() => InputFocusFeature<T>;
export { type InputFocusFeature, inputFocus };
