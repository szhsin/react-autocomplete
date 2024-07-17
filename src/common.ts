export const defaultEqual = <T>(itemA: T | undefined, itemB: T | undefined) => itemA === itemB;
export const getId = (prefix: string | undefined, suffix: string | number) =>
  prefix && prefix + suffix;
