import type { GetItemValue, Contextual } from '../types';
declare const adaptGetItemValue: <T>(getItemValue?: GetItemValue<T>["getItemValue"]) => Contextual<T>["getItemValue"];
export { adaptGetItemValue };
