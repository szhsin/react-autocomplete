import type { GetItemValue, Contextual } from '../types';
declare const adaptGetItemValue: <T>(getItemValue?: ((item: T) => string) | undefined) => (item: T | null | undefined) => string;
export { adaptGetItemValue };
