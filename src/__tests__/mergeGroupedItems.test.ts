import { mergeGroupedItems } from '..';

describe('mergeGroupedItems', () => {
  test('keyed groups', () => {
    const groups = {
      A: ['Alabama', 'Alaska', 'Arizona', 'Arkansas'],
      C: ['California', 'Colorado', 'Connecticut'],
      D: ['Delaware']
    };

    const mergedItems = mergeGroupedItems({ groups });
    expect(mergedItems).toEqual([
      'Alabama',
      'Alaska',
      'Arizona',
      'Arkansas',
      'California',
      'Colorado',
      'Connecticut',
      'Delaware'
    ]);
  });

  test('object groups', () => {
    const groups = [
      {
        groupKey: 'A',
        states: ['Alabama', 'Alaska', 'Arizona', 'Arkansas']
      },
      {
        groupKey: 'C',
        states: ['California', 'Colorado', 'Connecticut']
      },
      {
        groupKey: 'D',
        states: ['Delaware']
      }
    ];

    const mergedItems = mergeGroupedItems({
      groups,
      getItemsInGroup: (group) => group.states
    });
    expect(mergedItems).toEqual([
      'Alabama',
      'Alaska',
      'Arizona',
      'Arkansas',
      'California',
      'Colorado',
      'Connecticut',
      'Delaware'
    ]);

    expect(mergeGroupedItems({ groups })).toEqual([]);
  });
});
