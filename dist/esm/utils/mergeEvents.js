const mergeEvents = (events1, events2) => {
  const result = {
    ...events1
  };
  Object.keys(events2).forEach(key => {
    const e2 = events2[key];
    if (e2) {
      const e1 = events1[key];
      result[key] = e1 ? e => {
        e1(e);
        e2(e);
      } : e2;
    }
  });
  return result;
};

export { mergeEvents };
