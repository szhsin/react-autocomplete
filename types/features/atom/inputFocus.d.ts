import type { Feature, GetPropsFunctions } from '../../types';
type InputFocusFeature<T> = Feature<T, Pick<GetPropsFunctions<T>, 'getInputProps'> & {
    focused: boolean;
}>;
declare const inputFocus: <T>() => InputFocusFeature<T>;
export { type InputFocusFeature, inputFocus };
