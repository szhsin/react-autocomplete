import type { GetItemValue, Contextual } from '../common';
declare const adaptGetItemValue: <T>(getItemValue?: ((item: T) => string) | undefined) => (item: T | null | undefined) => string;
export { adaptGetItemValue };
