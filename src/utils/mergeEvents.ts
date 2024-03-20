import type { HTMLAttributes } from 'react';

const mergeEvents = <T extends HTMLAttributes<HTMLElement>>(events1: T, events2: T) => {
  const result = { ...events1 };

  (Object.keys(events2) as (keyof T)[]).forEach((key) => {
    const e2 = events2[key] as ((e: unknown) => void) | undefined;
    if (e2) {
      const e1 = events1[key] as ((e: unknown) => void) | undefined;
      result[key] = (
        e1
          ? (e: unknown) => {
              e1(e);
              e2(e);
            }
          : e2
      ) as T[keyof T];
    }
  });

  return result;
};

export { mergeEvents };
