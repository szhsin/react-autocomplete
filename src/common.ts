export const defaultEqual = <T>(itemA: T | undefined, itemB: T | undefined) => itemA === itemB;

export const getId = (prefix: string | undefined, suffix: 'l' | 'i' | 'a' | number) =>
  prefix && prefix + suffix;

export const ButtonProps: React.ButtonHTMLAttributes<HTMLButtonElement> = {
  tabIndex: -1,
  type: 'button'
};
