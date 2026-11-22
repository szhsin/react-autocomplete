import { autocompleteLite } from '../features/atom/autocompleteLite.js';
import { dropdownToggle } from '../features/atom/dropdownToggle.js';
import { multiSelectDropdown } from '../features/molecule/multiSelectDropdown.js';

// eslint-disable-next-line vitest/expect-expect
test('no options', () => {
  autocompleteLite();
  dropdownToggle();
  multiSelectDropdown();
});
